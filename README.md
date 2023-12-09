# Bun Style Loader

Bun plugin to allow loading css, sass files, and css modules

## Usage

To begin, install the `bun-style-loader` package:

```shell
npm install --save-dev bun-style-loader
```

Next, add the plugin to your build script:

```javascript
import styleLoader from 'bun-style-loader';

Bun.build({
  ...
  plugins: [
    styleLoader(),
  ],
  ...
});
```

Now, you can import CSS, SASS files, and CSS modules in your code:

```javascript
import styles from './styles.css';

console.log(styles); // string of the css file
```

By following these steps, you integrate bun-style-loader into your project, allowing you to effortlessly import and use CSS, SASS, and CSS modules in your application.

## Configuration

The plugin does not support any options at this time.

## Insert CSS to DOM

The plugin does NOT automatically insert the CSS into the DOM. Instead, it provides the CSS either as a string or as key-value pairs in the case of CSS modules. To incorporate the CSS into the DOM, you need to manually utilize the `insertStyleElement`` function from `bun-style-loader/utils`.

Example for plain CSS:

```javascript
import { insertStyleElement } from 'bun-style-loader/utils';
import styles from './styles.css';

insertStyleElement(styles);
```

Example for CSS modules:

```css
/* styles.module.css */
.blue {
  color: blue;
}
```

```javascript
// app.js
import { insertStyleElement } from 'bun-style-loader/utils';
import styles, { code } from './styles.module.css';

insertStyleElement(styles, code);

export default function render() {
  return `<div class="${styles.blue}">Hello World</div>`;
}
```

These examples demonstrate how to use the `insertStyleElement` function to manually insert CSS into the DOM for both plain CSS files and CSS modules.

## TypeScript

You may need to add a custom type declaration.

For CSS modules:

```typescript
declare module '*.module.css' {
  const content: Record<string, string>;
  export default content;
  export const code: string;
}
```

For plain CSS files:

```typescript
declare module '*.css' {
  const content: string;
  export default content;
}
```

These type declarations allow you to use CSS modules and plain CSS files in your TypeScript project with proper typings.

## Frequently Asked Questions (FAQ)

### Q: Can I use this plugin on runtime?

**A:** No, using this plugin on runtime might not be supported in the current version. The plugin `onLoad` event for CSS files in Bun is not triggered during runtime, which significantly impact the functionality of this plugin. I want to support this feature in the future, but it is not possible at the moment.

## Support

If you encounter any issues, or have question regarding the `bun-style-loader`, please visit the [GitHub Issues](https://github.com/taggon/bun-style-loader) page to review existing topics or to file a new one.

## License

[MIT](./LICENSE)
