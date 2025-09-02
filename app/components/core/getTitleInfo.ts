
export function getTitleInfo(path: string): string {
  if (path === "/") return "ACCUEIL";
  if (path === "/about") return "À PROPOS";
  if (path === "/work") return "PROJETS";
  if (path === "/contact") return "CONTACT";
  if (path === "/404") return "404";
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0) {
    return segments[segments.length - 1].toUpperCase();
  }
  return "PAGE";
}
