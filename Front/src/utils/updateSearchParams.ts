const updateSearchParams = (name: string, value: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(name, value);

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
};
export default updateSearchParams;
