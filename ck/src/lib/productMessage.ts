export function productMessage(product: any) {
  return `Hi! I'm interested in ${product.name}.

Price: ${product.price}

Product:
${typeof window === 'undefined' ? '' : window.location.href}`;
}