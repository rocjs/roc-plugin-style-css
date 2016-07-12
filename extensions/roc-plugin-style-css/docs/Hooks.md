# Hooks for `roc-plugin-style-css`

## Hooks
* [roc](#roc)
  * [update-settings](#update-settings)
* [roc-plugin-style-css](#roc-plugin-style-css)
  * [add-style](#add-style)

## roc

### update-settings

Expected to return new settings that should be merged with the existing ones.

__Initial value:__ _Nothing_  
__Expected return value:__ `{}`

#### Arguments
| Name        | Description                                                                  | Type       | Required | Can be empty |
| ----------- | ---------------------------------------------------------------------------- | ---------- | -------- | ------------ |
| getSettings | A function that returns the settings after the context has been initialized. | `Function` | No       | Yes          |

## roc-plugin-style-css

### add-style

Used for adding additional style loaders.

Important that the _actions_ return an object matching the following:

`{ extensions: String/[String], loaders: String/[String] }`

__Initial value:__ _Nothing_  
__Expected return value:__ `{String / [String]}`
