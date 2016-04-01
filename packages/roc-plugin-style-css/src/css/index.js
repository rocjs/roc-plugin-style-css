import { getAbsolutePath } from 'roc';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import cssPipeline from './pipeline';
import { invokeHook } from '../roc/util';

export default ({ settings, previousValue: rocBuilder }) => (target) => () => {
    let {
        buildConfig,
        builder,
        info
    } = rocBuilder;

    const DEV = settings.build.mode === 'dev';
    const DIST = settings.build.mode === 'dist';
    const WEB = target === 'web';
    const NODE = target === 'node';

    const getGlobalStylePaths = (toMatch) => {
        if (WEB && settings.build.assets) {
            return settings.build.assets.map((path) => {
                if (toMatch.test(path)) {
                    return getAbsolutePath(path);
                }
            }).filter((path) => path !== undefined);
        }

        return [];
    };

    // Get extensions and loaders
    let currentExtensions = ['css'];
    let currentLoaders = [];
    invokeHook('add-style')(({ extensions, loaders }) => {
        currentExtensions = currentExtensions.concat(extensions);
        currentLoaders = currentLoaders.concat(loaders);
    });
    const toMatch = new RegExp(currentExtensions.map((extension) => `\\.${extension}$`).join('|'));

    const globalStylePaths = getGlobalStylePaths(toMatch);

    // Create general style loader
    const loader = NODE ?
        'css-loader/locals' :
        'css-loader';
    const styleLoader = cssPipeline(loader, currentLoaders, settings, DIST);

    buildConfig.module.loaders.push({
        test: (absPath) => {
            if (globalStylePaths.indexOf(absPath) === -1 && toMatch.test(absPath)) {
                return true;
            }
        },
        loader: WEB ?
            ExtractTextPlugin.extract(require.resolve('style-loader'), styleLoader) :
            styleLoader
    });

    // Create global style loader
    if (WEB) {
        buildConfig.module.loaders.push({
            test: (absPath) => {
                if (globalStylePaths.indexOf(absPath) !== -1) {
                    return true;
                }
            },
            loader: ExtractTextPlugin.extract(require.resolve('style-loader'),
                cssPipeline('css-loader', currentLoaders, settings, DIST))
        });
    }

    // Update resolve extensions
    buildConfig.resolve = {
        ...buildConfig.resolve,
        extensions: buildConfig.resolve.extensions.concat(currentExtensions.map((extension) => `.${extension}`))
    };

    // Configure autoprefixer
    buildConfig.postcss = [
        autoprefixer(settings.build.style.autoprefixer[0])
    ];

    // Configure ExtractTextPlugin
    buildConfig.plugins.push(
        new ExtractTextPlugin(settings.build.style.name, {
            disable: WEB && DEV
        })
    );

    return {
        buildConfig,
        builder,
        info
    };
};
