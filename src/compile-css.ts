import type { OnLoadResult } from 'bun';

export type CompileOptions = {
  cssModules?: boolean;
  targets?: string[];
};

export default async function compileCSS(content: string, path: string, options: CompileOptions = {}): Promise<OnLoadResult> {
  const css = await import('lightningcss-wasm');
  const imports: string[] = [];
  const targets = options.targets?.length ? css.browserslistToTargets(options.targets) : undefined;
  const { code, exports } = css.transform({
    filename: path,
    code: Buffer.from(content),
    cssModules: Boolean(options.cssModules),
    minify: true,
    targets,
    visitor: {
      Rule: {
        import(rule) {
          imports.push(rule.value.url);
          return [];
        }
      }
    }
  });

  if (options.cssModules) {
    const nameMap = Object.fromEntries(Object.entries(exports || {}).map(([key, item]) => [key, item.name]));
    return {
      contents: `
        export const code = ${JSON.stringify(code.toString())};
        export default ${JSON.stringify(nameMap)};
      `,
      loader: 'js',
    };
  }

  if (imports.length === 0) {
    return {
      contents: `export default ${JSON.stringify(code.toString())};`,
      loader: 'js',
    };
  }

  const imported = imports.map((url, i) => `import _css${i} from "${url}";`).join('\n');
  const exported = imports.map((_, i) => `_css${i}`).join(' + ');

  return {
    contents: `${imported}\nexport default ${exported} + ${JSON.stringify(code.toString())};`,
    loader: 'js',
  };
}
