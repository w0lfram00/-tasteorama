const updateSearchParams = (key: string, value: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else params.set(key, "");

  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.pushState({}, "", newUrl);
};
export default updateSearchParams;
