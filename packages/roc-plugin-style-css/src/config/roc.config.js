export default {
    settings: {
        build: {
            style: {
                name: '[name].[hash].css',
                modules: true,
                autoprefixer: [{
                    // TODO Use some abstraction here.
                    browsers: 'last 2 version'
                }]
            }
        }
    }
};
