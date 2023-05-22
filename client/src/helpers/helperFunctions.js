const generateTimeStamp = function(dateBefore, dateAfter) {
  const seconds = (dateAfter - dateBefore) / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const months = days / 356;
  const years = months / 12;

  if (years >= 1) {
    const output = Math.round(years);
    return output + (output > 1 ? " Years" : " Year") + " Ago";
  }

  if (months >= 1) {
    const output = Math.round(months);
    return output + (output > 1 ? " Months" : " Month") + " Ago";
  }

  if (days >= 1) {
    const output = Math.round(days);
    return output + (output > 1 ? " Days" : " Day") + " Ago";
  }

  if (hours >= 1) {
    const output = Math.round(hours);
    return output + (output > 1 ? " Hours" : " Hour") + " Ago";
  }

  if (minutes >= 1) {
    const output = Math.round(minutes);
    return output + (output > 1 ? " Minutes" : " Minute") + " Ago";
  }

  return "Just Now";

};

export { generateTimeStamp };