export function formatDate(time) {
  const dateStr = time;
  const date = new Date(dateStr);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Asia/Tehran',
  };

  return new Intl.DateTimeFormat('en-US', options).format(date);
}
