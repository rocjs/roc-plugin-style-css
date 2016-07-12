# Settings for `roc-plugin-style-css`

## Build

### Style
| Name     | Description                                          | Path                              | CLI option                          | Default               | Type      | Required | Can be empty | Extensions           |
| -------- | ---------------------------------------------------- | --------------------------------- | ----------------------------------- | --------------------- | --------- | -------- | ------------ | -------------------- |
| modules  | If CSS Modules should be enabled.                    | build.style.modules               | --build-style-modules               | `true`                | `Boolean` | Yes      | Yes          | roc-plugin-style-css |
| name     | The naming pattern to use for the built style files. | build.style.name                  | --build-style-name                  | `"[name].[hash].css"` | `String`  | Yes      | No           | roc-plugin-style-css |

#### Autoprefixer
✓ ― Supports `__raw`

| Name     | Description                                          | Path                              | CLI option                          | Default               | Type      | Required | Can be empty | Extensions           |
| -------- | ---------------------------------------------------- | --------------------------------- | ----------------------------------- | --------------------- | --------- | -------- | ------------ | -------------------- |
| browsers | What browsers that should be supported.              | build.style.autoprefixer.browsers | --build-style-autoprefixer-browsers | `"last 2 version"`    | `String`  | No       | No           | roc-plugin-style-css |
