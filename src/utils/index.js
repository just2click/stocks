export const convertToUTC = (date) => {
  // Consider verifying that the value is a date to prevent crushes
  const dateObj = new Date(date)
  const utcYear = dateObj.getUTCFullYear();
  const utcMonth = dateObj.getUTCMonth();
  const utcDate = dateObj.getUTCDate();
  const utcHours = dateObj.getUTCHours();
  const utcMinutes = dateObj.getUTCMinutes();
  const utcSeconds = dateObj.getUTCSeconds();

  return Date.UTC(utcYear, utcMonth, utcDate, utcHours, utcMinutes, utcSeconds);
}