/**
 * Add a style tag to the document
 * @param code
 */
export function insertStyleElement(code: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.innerHTML = code;
  document.head.appendChild(style);
}
