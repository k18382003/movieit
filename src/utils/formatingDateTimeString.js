/**
 * Converting any time string to "Sat, 02 Mar 2024 02:30" format
 * @param {string} timeInput
 * @returns
 */

export const formatingDateTimeString = (timeInput) => {
  const formatedDateTime = new Date(timeInput).toUTCString();
  const firstColone = formatedDateTime.indexOf(':');
  const SecondColone = formatedDateTime.indexOf(':', firstColone + 1);

  return formatedDateTime.slice(0, SecondColone);
};
