// Curated accent palette for CMS-selectable icon colors.
// Keep values in sync with the color select options in public/admin/config.yml.
export const accentColors: Record<string, string> = {
  blue: '#1d4ed8',
  cyan: '#0e7490',
  green: '#047857',
  orange: '#c2410c',
  amber: '#b45309',
  red: '#b91c1c',
  violet: '#6d28d9',
  pink: '#be185d',
};

// Brand navy — used when an item has no color set in the CMS.
export const defaultAccent = 'rgb(39, 45, 122)';

export function resolveAccent(color?: string): string {
  return (color && accentColors[color]) || defaultAccent;
}
