# Settings for `roc-plugin-style-css`

## Build

### Style
| Name       | Description                                          | Path                                | CLI option                            | Default               | Type      | Required | Can be empty | Extensions           |
| ---------- | ---------------------------------------------------- | ----------------------------------- | ------------------------------------- | --------------------- | --------- | -------- | ------------ | -------------------- |
| modules    | If CSS Modules should be enabled.                    | build.style.modules                 | --build-style-modules                 | `true`                | `Boolean` | No       | Yes          | roc-plugin-style-css |
| name       | The naming pattern to use for the built style files. | build.style.name                    | --build-style-name                    | `"[name].[hash].css"` | `String`  | No       | Yes          | roc-plugin-style-css |

#### Autoprefixer
| Name       | Description                                          | Path                                | CLI option                            | Default               | Type      | Required | Can be empty | Extensions           |
| ---------- | ---------------------------------------------------- | ----------------------------------- | ------------------------------------- | --------------------- | --------- | -------- | ------------ | -------------------- |
| __override |                                                      | build.style.autoprefixer.__override | --build-style-autoprefixer-__override | `{}`                  | `Unknown` | No       | Yes          | roc-plugin-style-css |
| browsers   | What browsers that should be supported.              | build.style.autoprefixer.browsers   | --build-style-autoprefixer-browsers   | `"last 2 version"`    | `String`  | No       | Yes          | roc-plugin-style-css |
