const clearSearchParams = () => {
  const newUrl = `${window.location.pathname}`;

  window.history.pushState({}, "", newUrl);
};

export default clearSearchParams;
