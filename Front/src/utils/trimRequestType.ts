const trimRequestType = (name: string) => {
  return name.slice(0, name.lastIndexOf("/"));
};

export default trimRequestType;
