/**
*Return a given 00000111 cep as 00000-111
*/
export function formatCep(cep: string): string {
  return cep.substring(0, 5) + '-' + cep.substring(cep.length - 3, cep.length)
}
