import {
    isObject,
    isArrayOrSingle,
    isString
} from 'roc/validators';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';
import css from '../css';

import { name } from './util';

export default {
    name,
    config,
    meta,
    actions: {
        css: {
            hook: 'build-webpack',
            description: 'Adds CSS support.',
            action: () => css
        }
    },
    hooks: {
        'add-style': {
            description: `
            Used for adding additional style loaders.

            Important that the _actions_ return an object matching the following:

            \`{ extensions: String/[String], loaders: String/[String] }\``,
            hasCallback: true,
            returns: isObject(isArrayOrSingle(isString))
        }
    }
};
