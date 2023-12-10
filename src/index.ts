import type { BunPlugin } from 'bun';
import compileCSS from './compile-css';

/**
 * No options for now
 */
export type StyleLoaderOptions = {
  /**
   * List of target browsers to support
   * @example ['chrome 80', 'ie 11']
   */
  targets?: string[];
};

const defaultOptions: StyleLoaderOptions = {
  targets: [],
};

export default function styleLoader(options: StyleLoaderOptions = {}): BunPlugin {
  const opts = { ...defaultOptions, ...options };

  return {
    name: 'style-loader',
    async setup(build) {
      const [sass, fs] = await Promise.all([
        import('sass'),
        import('fs'),
      ]);

      build.onLoad({ filter: /\.css$/ }, (args) => {
        const contents = fs.readFileSync(args.path, 'utf8');
        const isCssModule = args.path.endsWith('.module.css');

        return compileCSS(contents, args.path, {
          cssModules: isCssModule,
          targets: opts.targets,
        });
      });

      build.onLoad({ filter: /\.scss$/ }, (args) => {
        const result = sass.compile(args.path);
        return compileCSS(result.css, args.path, {
          targets: opts.targets,
        });
      });
    },
  };
}
