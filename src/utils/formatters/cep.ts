export const formatCEP = (cep: string): string => {
  return cep
    .replace(/\D/g, '')
    .slice(0, 8)
    .replace(/(\d{5})(\d{3})/, '$1-$2');
};