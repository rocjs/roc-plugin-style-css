import { getAbsolutePath } from 'roc';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import { invokeHook } from '../roc/util';

import cssPipeline from './pipeline';

export default ({ context: { config: { settings } }, previousValue: webpackConfig }) => (target) => () => {
    const newWebpackConfig = { ...webpackConfig };
    const DEV = settings.build.mode === 'dev';
    const DIST = settings.build.mode === 'dist';
    const WEB = target === 'web';
    const NODE = target === 'node';

    const getGlobalStylePaths = (toMatch) => {
        if (WEB && settings.build.resources) {
            return settings.build.resources.map((path) => {
                if (toMatch.test(path)) {
                    return getAbsolutePath(path);
                }

                return undefined;
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

    newWebpackConfig.module.loaders.push({
        test: (absPath) => {
            if (globalStylePaths.indexOf(absPath) === -1 && toMatch.test(absPath)) {
                return true;
            }

            return false;
        },
        loader: WEB ?
            ExtractTextPlugin.extract(require.resolve('style-loader'), styleLoader) :
            styleLoader,
    });

    // Create global style loader
    if (WEB) {
        newWebpackConfig.module.loaders.push({
            test: (absPath) => {
                if (globalStylePaths.indexOf(absPath) !== -1) {
                    return true;
                }

                return false;
            },
            loader: ExtractTextPlugin.extract(require.resolve('style-loader'),
                cssPipeline('css-loader', currentLoaders, settings, DIST, false)),
        });
    }

    // Update resolve extensions
    newWebpackConfig.resolve = {
        ...newWebpackConfig.resolve,
        extensions: newWebpackConfig.resolve.extensions.concat(currentExtensions.map((extension) => `.${extension}`)),
    };

    // Configure autoprefixer
    newWebpackConfig.postcss = [
        autoprefixer(settings.build.style.autoprefixer),
    ];

    // Configure ExtractTextPlugin
    newWebpackConfig.plugins.push(
        new ExtractTextPlugin(settings.build.style.name, {
            disable: WEB && DEV,
        })
    );

    // We want to be able to use the css-loader in projects without the user needing to install them directly.
    newWebpackConfig.resolveLoader.root.push(join(__dirname, '../../node_modules'));

    return newWebpackConfig;
};
