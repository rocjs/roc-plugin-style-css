export default {
    settings: {
        build: {
            style: {
                name: '[name].[hash].css',
                modules: true,
                autoprefixer: {
                    __raw: {},
                    browsers: 'last 2 version',
                },
            },
        },
    },
};
