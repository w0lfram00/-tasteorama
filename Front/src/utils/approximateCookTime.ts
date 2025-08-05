const approximateCookTime = (time: number) => {
  let timeFraction = Math.round(time * 0.1);
  if (!timeFraction) timeFraction = 1;
  return `${time - timeFraction}-${time + timeFraction} minutes`;
};

export default approximateCookTime;
