import styleLoader from 'bun-style-loader';

Bun.build({
  entrypoints: ['./index.js'],
  outdir: './dist',
  plugins: [styleLoader()],
});
