# RiceCereal CSS Refactor Tool

1. Highlights the unused css classes of css/scss/sass files by scaning js files in the same folder.
2. TODO

## How to use

Automatically highlights the unused css classes when opening css/scss/sass files.

<!--## Extension Settings-->

<!--## Known Issues-->

## Release Notes

### 0.0.7
support ts and tsx file.

### 0.0.6

support css module. css must be imported as an object named 'styles'.

```js
import styles from "./component.module.scss";
```

escape ant-design style which start with .ant-

```css
    .ant-menu-item {
      background: #000f50;
      width: 110px !important;
      }
```

### 0.0.1

Initial release
