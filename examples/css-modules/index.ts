import styles, { code } from './style.module.css';
import { insertStyleElement } from 'bun-style-loader/utils';

insertStyleElement(code);

console.dir('Styles loaded:', styles);
