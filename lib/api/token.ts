import Cookies from "js-cookie";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

const getDateByminutes = (minutes: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutes);
  return date;
};

export const setTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken, {
    path: "/",
    expires: getDateByminutes(60 * 24 * 7),
    secure: true,
    sameSite: "strict",
  });
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    path: "/",
    expires: getDateByminutes(60 * 24 * 7),
    secure: true,
    sameSite: "strict",
  });
};

export const getAccessToken = () => Cookies.get(ACCESS_TOKEN);
export const getRefreshToken = () => Cookies.get(REFRESH_TOKEN);
export const getTokens = () => ({
  accessToken: getAccessToken(),
  refreshToken: getRefreshToken(),
});

export const removeAccessToken = () => Cookies.remove(ACCESS_TOKEN);
export const removeRefreshToken = () => Cookies.remove(REFRESH_TOKEN);

export const removeAllCookies = () => {
  Cookies.remove(ACCESS_TOKEN);
  Cookies.remove(REFRESH_TOKEN);
};
