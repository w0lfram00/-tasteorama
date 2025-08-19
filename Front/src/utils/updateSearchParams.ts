const updateSearchParams = (key: string, value: string | null) => {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else {
    if (!params.get(key)) {
      params.set(key, "");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${params.toString()}`
      );
      return;
    } else params.set(key, "");
  }

  const newUrl = `${window.location.pathname}?${params.toString()}`;

  if (newUrl !== window.location.href.replace(window.location.origin, "")) {
    window.history.pushState({}, "", newUrl);
  }
};

export default updateSearchParams;
