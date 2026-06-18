export function getLocalizedText(
  obj: any,
  key: string,
  locale: string = 'tg'
): string {
  const localizedKey = `${key}_${locale}`;
  return obj[localizedKey] || obj[key] || '';
}

export function getLocaleFromStorage(): string {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('locale') || 'tg';
  }
  return 'tg';
}
