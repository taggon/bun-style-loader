# Bun Style Loader

Bun plugin to allow loading css, sass files, and css modules

## Usage

To get begin, install the `bun-style-loader` package using the following commands:

```shell
npm install --save-dev bun-style-loader
npm install --save-dev sass # Required for compiling Sass (only when needed)
```

Next, add the plugin to your build script:

```js
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

```js
import styles from './styles.css';

console.log(styles); // string of the css file
```

By following these steps, you integrate bun-style-loader into your project, allowing you to effortlessly import and use CSS, SASS, and CSS modules in your application.

## Using at Runtime

To incorporate the `bun-style-loader` at runtime, follow these steps. Assume you are creating a preloaded script named `preload.ts`:

```js
// preload.ts
import { plugin } from 'bun';
import styleLoader from 'bun-style-loader';

await plugin(styleLoader(/* options here */));
```

Next, include `preload.ts` in the `preload` property within your `bunfig.toml` configuration file:

```toml
# bunfig.toml
preload = ["./preload.ts"]
```

Please note that it is crucial to insert the `await` keyword before the `plugin` call to ensure proper functionality. Neglecting to do so may result in issues due to a reported problem, as outlined in [this GitHub issue](https://github.com/oven-sh/bun/issues/5520).

## Configuration

### targets

Lightning CSS, which `bun-style-loader` relies on, does not perform automatic transpilation of CSS syntax for older browsers by default. To support older browsers, you can manually specify target browsers as follows:

```js
import styleLoader from 'bun-style-loader';

Bun.build({
  ...
  plugins: [
    styleLoader({
      targets: [
        'chrome 108',
        'ie 11',
        'safari 15.6',
        'ios_saf 15.6',
      ]
    }),
  ],
  ...
});
```

Alternatively, you can easily generate the list of target browsers using the `browserslist` package:

```js
import styleLoader from 'bun-style-loader';
import browserslist from 'browserslist';

Bun.build({
  ...
  plugins: [
    styleLoader({
      targets: browserslist('> 0.25%'),
    }),
  ],
  ...
});
```

This approach streamlines the configuration process, ensuring that your styles are appropriately transpiled for a broader range of browsers. To see how it works, refer to the `runtime-ts` example in [the repository](https://github.com/taggon/bun-style-loader).

## Insert CSS to DOM

The plugin does NOT automatically insert the CSS into the DOM. Instead, it provides the CSS either as a string or as key-value pairs in the case of CSS modules. To incorporate the CSS into the DOM, you need to manually utilize the `insertStyleElement`` function from `bun-style-loader/utils`.

Example for plain CSS:

```js
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

```js
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

## Support

If you encounter any issues, or have question regarding the `bun-style-loader`, please visit the [GitHub Issues](https://github.com/taggon/bun-style-loader) page to review existing topics or to file a new one.

## License

[MIT](./LICENSE)
