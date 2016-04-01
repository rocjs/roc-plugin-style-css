# Hooks for `roc-plugin-style-css`

## Hooks
* [roc-plugin-style-css](#roc-plugin-style-css)
  * [add-style](#add-style)

## roc-plugin-style-css

### add-style

Used for adding additional style loaders.

Important that the _actions_ return an object matching the following:

`{ extensions: String/[String], loaders: String/[String] }`

__Initial value:__ _Nothing_  
__Expected return value:__ `{String / [String]}`
