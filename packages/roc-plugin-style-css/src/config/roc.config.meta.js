import { isBoolean, isArray, isObject } from 'roc/validators';

export default {
    settings: {
        groups: {
            build: {
                style: 'Settings for style related things.'
            }
        },
        descriptions: {
            build: {
                style: {
                    name: 'The naming pattern to use for the built style files.',
                    modules: 'If CSS Modules should be enabled.',
                    autoprefixer: 'Settings for Autoprefixer.'
                }
            }
        },

        validations: {
            build: {
                style: {
                    modules: isBoolean,
                    autoprefixer: isArray(isObject())
                }
            }
        }
    }
};
