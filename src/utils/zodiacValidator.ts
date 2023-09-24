/* eslint-disable prettier/prettier */

const getZodiacSign = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();

  if ((month === 'January' && day >= 20) || (month === 'February' && day < 19)) {
    return 'Aquarius';
  }

  if ((month === 'February' && day >= 19) || (month === 'March' && day < 21)) {
    return 'Pisces';
  }

  if ((month === 'March' && day >= 21) || (month === 'April' && day < 20)) {
    return 'Aries';
  }

  if ((month === 'April' && day >= 20) || (month === 'May' && day < 21)) {
    return 'Taurus';
  }

  if ((month === 'May' && day >= 21) || (month === 'June' && day < 22)) {
    return 'Gemini';
  }

  if ((month === 'June' && day >= 22) || (month === 'July' && day < 23)) {
    return 'Cancer';
  }

  if ((month === 'July' && day >= 23) || (month === 'August' && day < 23)) {
    return 'Leo';
  }

  if ((month === 'August' && day >= 23) || (month === 'September' && day < 23)) {
    return 'Virgo';
  }

  if ((month === 'September' && day >= 23) || (month === 'October' && day < 24)) {
    return 'Libra';
  }

  if ((month === 'October' && day >= 24) || (month === 'November' && day < 22)) {
    return 'Scorpio';
  }

  if ((month === 'November' && day >= 22) || (month === 'December' && day < 22)) {
    return 'Sagittarius';
  }

  if ((month === 'December' && day >= 22) ||(month === 'January' && day < 20)) {
    return 'Capricorn';
  }

  return undefined;
};

// parameter dateString with format ISO YYYY-MM-DD
export const checkZodiac = (dateString: string, zodiac: string): boolean => {
  const res = getZodiacSign(dateString);
  if (res && res === zodiac) return true;
  return false;
};
