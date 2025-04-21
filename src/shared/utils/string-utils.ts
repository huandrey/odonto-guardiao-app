export function formatarCEP(cep: string) {
  cep = cep.replace(/\D/g, '');

  if (cep.length > 8) cep = cep.slice(0, 8)
  if (cep.length < 8) return cep;

  return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
}
