export const validDomains = ['com', 'co.uk', 'de', 'fr', 'it', 'es', 'ca', 'co.jp','ae','sa','eg'];

export function isValidProductId(id) {
  return /^[A-Za-z0-9]+$/.test(id);
}

