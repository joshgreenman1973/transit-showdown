export function formatCurrency(value, currency = 'USD') {
  if (value === null || value === undefined) return '—';
  const symbol = currency === 'GBP' ? '£' : '$';
  return `${symbol}${value.toFixed(2)}`;
}

export function formatPercent(value) {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(1)}%`;
}

export function formatNumber(value) {
  if (value === null || value === undefined) return '—';
  return value.toLocaleString();
}

export function formatMinutes(value) {
  if (value === null || value === undefined) return 'N/A';
  return `${value} min`;
}

export function shortMonth(dateStr) {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} '${year.slice(2)}`;
}
