export function html(node: HTMLElement, content: string) {
  node.innerHTML = content;
  return {
    update(content: string) {
      node.innerHTML = content;
    },
  };
}
