export const getLocalToken = () => {
  if (typeof window !== "undefined") {
    return {
      jwt: localStorage.getItem("jwt"),
      jwtRefreshToken: localStorage.getItem("jwt-refresh-token"),
    };
  }
  return {
    jwt: "",
    jwtRefreshToken: "",
  };
};

export const setLocalToken = (jwt: string, jwtRefreshToken: string) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("jwt-refresh-token", jwtRefreshToken);
};

export const removeLocalToken = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("jwt");
  localStorage.removeItem("jwt-refresh-token");
};
