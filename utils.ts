export function getPublicUrl(path: string) {
  const base = import.meta.env.BASE_URL;
  if (!base || base === '/') return path.startsWith('/') ? path : '/' + path;
  return path.startsWith('/') ? base + path.slice(1) : base + path;
}
