import { notFound } from 'next/navigation';

export function redirectTo404() {
  return notFound();
}

/**
 * Vérifie si une route existe dans la liste des routes valides
 * @param route - La route à vérifier
 * @param validRoutes - Liste des routes valides
 * @returns boolean - True si la route est valide, sinon False
 */
export function isValidRoute(route: string, validRoutes: string[]): boolean {
  return validRoutes.includes(route);
}
