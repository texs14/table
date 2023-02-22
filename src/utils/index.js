async function getQueryParams(router, route) {
  const params = new URLSearchParams();
  await router.isReady();

  for (const key in route.query) {
    route.query[key] !== "" && params.append(key, route.query[key]);
  }

  return params;
}

export { getQueryParams };
