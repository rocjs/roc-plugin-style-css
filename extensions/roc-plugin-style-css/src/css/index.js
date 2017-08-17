import { join } from 'path';

import { getAbsolutePath } from 'roc';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

import { invokeHook } from '../roc/util';

import cssPipeline from './pipeline';

export default ({ context: { config: { settings } }, previousValue: webpackConfig }) => (target) => () => {
    const newWebpackConfig = { ...webpackConfig };

    const DEV = settings.build.mode === 'dev';
    const DIST = settings.build.mode === 'dist';
    const WEB = target === 'web';
    const NODE = target === 'node';
    const sourceMap = settings.build.style.sourceMap;

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
    const styles = [{ extensions: ['css'], loaders: [] }];
    invokeHook('add-style')(({ extensions, loaders }) => {
        styles.push({ extensions: [].concat(extensions), loaders: [].concat(loaders) });
    });

    let preLoaders = [];
    invokeHook('add-style-preloaders')((loaders) => {
        preLoaders = preLoaders.concat(loaders);
    });

    // Create a seperate pipeline for each `add-style` invocation
    styles.forEach(({ extensions, loaders }) => {
        // We allow stylesheet files to end with a query string
        const toMatch = new RegExp(extensions.map((extension) => `\\.${extension}(\\?.*)?$`).join('|'));
        const globalStylePaths = getGlobalStylePaths(toMatch);

        // Create general style loader
        const loader = NODE ?
            'css-loader/locals' :
            'css-loader';
        const styleLoader = (cssModules) => cssPipeline(loader, loaders, DIST, sourceMap, cssModules, preLoaders);

        // Add CSS Modules loader
        newWebpackConfig.module.loaders.push({
            test: (absPath) => {
                if (
                    globalStylePaths.indexOf(absPath) === -1 && toMatch.test(absPath) &&
                    (settings.build.style.modules || /\?modules$/.test(absPath) || /\?modules=true$/.test(absPath))
                ) {
                    // We do not want to enable CSS modules if disabled
                    if (/\?modules=false$/.test(absPath)) {
                        return false;
                    }

                    return true;
                }

                return false;
            },
            loader: WEB ?
                ExtractTextPlugin.extract(require.resolve('style-loader'), styleLoader(true)) :
                styleLoader(true),
        });

        // Create global style loader
        if (WEB) {
            newWebpackConfig.module.loaders.push({
                test: (absPath) => {
                    if (
                        globalStylePaths.indexOf(absPath) === -1 && toMatch.test(absPath) &&
                        (!settings.build.style.modules || /\?modules=false$/.test(absPath))
                    ) {
                        // We do not want to process as global CSS if modules is enabled for the specific file
                        if (/\?modules$/.test(absPath) || /\?modules=true$/.test(absPath)) {
                            return false;
                        }

                        return true;
                    }

                    if (globalStylePaths.indexOf(absPath) !== -1) {
                        return true;
                    }

                    return false;
                },
                loader: ExtractTextPlugin.extract(require.resolve('style-loader'), styleLoader(false)),
            });
        } else {
            newWebpackConfig.externals.unshift((context, request, callback) => {
                // Mark all requests to stylesheets as internal so we can replace them
                // using NormalModuleReplacementPlugin
                if (toMatch.test(request)) {
                    return callback(null, false);
                }
                return callback();
            });

            if (settings.build.style.modules) {
                const makeNoop = new RegExp(extensions
                    .map((extension) => `\\.${extension}\\?modules=false$`).join('|')
                );
                newWebpackConfig.plugins.push(
                    new webpack.NormalModuleReplacementPlugin(makeNoop, require.resolve('node-noop'))
                );
            } else {
                // The difference here from above is that we will take files without a query string and
                // ones that have disabled explicitly
                // This means that we are not fully correct, should be fixed in the future
                const makeNoop = new RegExp(extensions
                    .map((extension) => `\\.${extension}(|\\?modules=false)$`).join('|')
                );
                newWebpackConfig.plugins.push(
                    new webpack.NormalModuleReplacementPlugin(makeNoop, require.resolve('node-noop'))
                );
            }
        }

        // Update resolve extensions
        newWebpackConfig.resolve = {
            ...newWebpackConfig.resolve,
            extensions: newWebpackConfig.resolve.extensions.concat(extensions.map((extension) => `.${extension}`)),
        };
    });

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
