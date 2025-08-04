const trimToLength = (string: string, trimLength: number) => {
  let trimIndex = string.indexOf(" ", trimLength - 3);
  if (string[trimIndex - 1] == "," || string[trimIndex - 1] == ".") trimIndex--;
  return string.slice(0, trimIndex) + "...";
};

export default trimToLength;
