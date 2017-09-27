import { isBoolean, isString, isArray, oneOf, notEmpty, required } from 'roc/validators';

export default {
    settings: {
        build: {
            style: {
                description: 'Settings for style related things.',
                autoprefixer: {
                    description: 'Settings for Autoprefixer.',
                    browsers: {
                        description: 'What browsers that should be supported.',
                        validator: oneOf(notEmpty(isString), isArray(notEmpty(isString))),
                    },
                },
                name: {
                    description: 'The naming pattern to use for the built style files.',
                    validator: required(notEmpty(isString)),
                },
                modules: {
                    description: 'If CSS Modules should be enabled.',
                    validator: required(isBoolean),
                },
                sourceMap: {
                    description: 'If CSS source maps should be enabled.',
                    validator: isBoolean,
                },
                minimize: {
                    description: 'If minification should be enabled',
                    validator: isBoolean,
                },
            },
        },
    },
};
