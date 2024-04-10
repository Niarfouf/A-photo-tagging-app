const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  let seconds = (timeInSeconds - minutes * 60).toFixed(1);

  if (minutes !== 0) {
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return minutes + ':' + seconds + ' s';
  } else {
    return seconds + ' s';
  }
};
export default formatTime;
