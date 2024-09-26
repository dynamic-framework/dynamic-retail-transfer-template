export function getInitials(name: string): string {
  if (!name) return '';
  const words = name.trim().split(' ');

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  const initials = words.slice(0, 2).map((word) => word.charAt(0).toUpperCase()).join('');
  return initials;
}
