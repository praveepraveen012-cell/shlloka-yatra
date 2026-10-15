/**
 * Shlloka Yatra - Public Asset Resolver
 * 
 * Accurately resolves asset URLs taking the deployment base path into account
 * (e.g. '/' on localhost dev/preview, or '/shlloka-yatra/' on GitHub Pages).
 */
export function assetUrl(path) {
  if (!path) return '';

  // Return absolute or data URLs as-is
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Remove leading slash if any
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Retrieve base from Vite env (defaults to '/' if empty)
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

  return `${base}${cleanPath}`;
}

export default assetUrl;
