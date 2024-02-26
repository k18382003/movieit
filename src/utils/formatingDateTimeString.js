/**
 * Converting any time string to "Sat, 02 Mar 2024 02:30" format
 * @param {Date} timeInput 
 * @returns 
 */

export const formatingDateTimeString = (timeInput) => {
  const firstColone = timeInput.toString().indexOf(':');
  const SecondColone = timeInput.toString().indexOf(':', firstColone + 1);

  return timeInput.toString().slice(0, SecondColone);
};
