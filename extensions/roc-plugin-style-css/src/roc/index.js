import { isArray, isObject, isString, oneOf } from 'roc/validators';
import { lazyFunctionRequire } from 'roc';

import config from '../config/roc.config.js';
import meta from '../config/roc.config.meta.js';

const lazyRequire = lazyFunctionRequire(require);

export default {
    config,
    meta,
    actions: [{
        hook: 'build-webpack',
        description: 'Adds CSS support.',
        action: lazyRequire('../css'),
    }],
    hooks: {
        'add-style': {
            description: `
            Used for adding additional style loaders.

            Important that the _actions_ return an object matching the following:

            \`{ extensions: String/[String], loaders: String/[String] }\``,
            hasCallback: true,
            returns: isObject(oneOf(isString, isArray(isString))),
        },
        'add-style-preloaders': {
            description: `
            Used to add general loaders early in the chain, before the PostCSS loader.

            These loaders will be applied to all styles added from the \`add-style\` hook.`,
            hasCallback: true,
            returns: isArray(isString),
        },
    },
};
