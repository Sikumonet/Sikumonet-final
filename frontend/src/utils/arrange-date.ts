export const arrangeDateTime = (dateTimeStr: string) => {
  const dateTime = new Date(dateTimeStr);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");
  let hours = dateTime.getHours();
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");
  // const seconds = String(dateTime.getSeconds()).padStart(2, "0");
  let ampm = "AM";

  if (hours > 12) {
    hours -= 12;
    ampm = "PM";
  } else if (hours === 12) {
    ampm = "PM";
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedDateTime = `${year}-${month}-${day} | ${hours}:${minutes} ${ampm}`;

  return formattedDateTime;
};