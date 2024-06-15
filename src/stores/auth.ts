export const getLocalToken = () => {
  return {
    jwt: localStorage.getItem("jwt"),
    jwtRefreshToken: localStorage.getItem("jwt-refresh-token"),
  };
};

export const setLocalToken = (jwt: string, jwtRefreshToken: string) => {
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("jwt-refresh-token", jwtRefreshToken);
};

export const removeLocalToken = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("jwt-refresh-token");
};
