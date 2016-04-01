# Settings for `roc-plugin-style-css`

## Build

### Style
Settings for style related things.

| Name         | Description                                          | Path                     | CLI option                 | Default                           | Type      | Required |
| ------------ | ---------------------------------------------------- | ------------------------ | -------------------------- | --------------------------------- | --------- | -------- |
| autoprefixer | Settings for Autoprefixer.                           | build.style.autoprefixer | --build-style-autoprefixer | `[{"browsers":"last 2 version"}]` | `[{}]`    | No       |
| modules      | If CSS Modules should be enabled.                    | build.style.modules      | --build-style-modules      | `true`                            | `Boolean` | No       |
| name         | The naming pattern to use for the built style files. | build.style.name         | --build-style-name         | `"[name].[hash].css"`             | `Unknown` | No       |
