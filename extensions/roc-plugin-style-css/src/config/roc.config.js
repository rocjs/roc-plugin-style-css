export default {
    settings: {
        build: {
            style: {
                name: '[name].[hash].css',
                modules: true,
                sourceMap: false,
                autoprefixer: {
                    __raw: {},
                    browsers: 'last 2 version',
                },
            },
        },
    },
};
