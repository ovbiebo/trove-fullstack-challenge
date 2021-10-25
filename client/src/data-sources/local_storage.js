const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToken";

const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN);
}

const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
}

const setTokens = (userTokens) => {
    localStorage.setItem(ACCESS_TOKEN, `${userTokens[ACCESS_TOKEN]}`);
    localStorage.setItem(REFRESH_TOKEN, `${userTokens[REFRESH_TOKEN]}`);
}

const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

export {getRefreshToken, getAccessToken, setTokens, clearTokens}
