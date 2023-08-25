  export const getTotalHoursFromTimeSpan = (timeSpan: string) => {
    // Split the string to get days and time
    if (!timeSpan.includes(".")) {
      timeSpan = `0.${timeSpan}`;
    }
    const [days, time] = timeSpan.split(".");

    // Split the time to get hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(":").map(Number);

    // Calculate the total duration in milliseconds
    const totalMilliseconds = ((parseInt(days) * 24 + hours) * 60 + minutes) * 60 + seconds;

    const totalHours = Math.floor(totalMilliseconds / 3600);

    return totalHours;
  }