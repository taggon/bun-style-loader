import styleLoader from '../../src/index';

Bun.build({
  entrypoints: ['./index.js'],
  outdir: './dist',
  plugins: [styleLoader()],
});
