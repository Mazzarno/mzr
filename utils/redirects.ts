import { notFound } from 'next/navigation';

/**
 * Redirige vers la page 404 personnalisée
 * Utilisez cette fonction lorsque vous devez rediriger manuellement vers la page 404
 */
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
