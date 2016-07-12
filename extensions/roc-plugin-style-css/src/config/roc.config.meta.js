import { isBoolean, isString } from 'roc/validators';

export default {
    settings: {
        build: {
            __meta: {
                override: 'roc-package-webpack-dev',
            },
            style: {
                description: 'Settings for style related things.',
                autoprefixer: {
                    description: 'Settings for Autoprefixer.',
                    browsers: {
                        description: 'What browsers that should be supported.',
                        validator: isString,
                    },
                },
                name: {
                    description: 'The naming pattern to use for the built style files.',
                    validator: isString,
                },
                modules: {
                    description: 'If CSS Modules should be enabled.',
                    validator: isBoolean,
                },
            },
        },
    },
};
