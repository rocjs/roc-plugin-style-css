export default function cssPipeline(base, loaders, settings, isDist, cssModulesEnabled = true) {
    let moduleSettings = '';
    if (settings.build.style.modules && cssModulesEnabled) {
        moduleSettings = '&module&localIdentName=';

        // Define how the class names should be defined
        if (isDist) {
            moduleSettings += '[hash:base64:5]';
        } else {
            moduleSettings += '[path]_[name]__[local]___[hash:base64:5]';
        }
    }

    const extraLoaders = loaders.length > 0 ?
        `!${loaders.join('!')}` :
        '';

    // We set importLoaders to nr. loaders + 1 to get css-loader to process everything through the pipeline
    return `${require.resolve(base)}?sourceMap&-autoprefixer&importLoaders=${loaders.length + 1}${moduleSettings}` +
        `!${require.resolve('postcss-loader')}${extraLoaders}`;
}
