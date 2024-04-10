const calculateCoordinate = (event, myRefMain, myRefImg) => {
  const localX =
    event.clientX -
    myRefMain.current.offsetLeft -
    (1.5 / 100) * myRefImg.current.clientWidth;
  const localY =
    event.clientY -
    myRefMain.current.offsetTop -
    (1.5 / 100) * myRefImg.current.clientWidth +
    window.scrollY;
  let dropPosX;

  if (myRefImg.current.clientWidth - localX < 120) {
    dropPosX = localX - (1 / 100) * myRefImg.current.clientWidth - 64;
  } else if (myRefImg.current.clientWidth - localX >= 120) {
    dropPosX = localX + (4 / 100) * myRefImg.current.clientWidth;
  }
  let dropPosY;
  if (myRefImg.current.clientHeight - localY < 180) {
    dropPosY = localY - 150;
  } else if (myRefImg.current.clientHeight - localY >= 180) {
    dropPosY = localY;
  }
  return {
    styleZone: { top: localY, left: localX },
    styleDropdown: { top: dropPosY, left: dropPosX },
  };
};
export default calculateCoordinate;
