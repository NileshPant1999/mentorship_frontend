function parseJwt(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("access_token")) {
    console.log(localStorage.getItem("access_token"));
    console.log(parseJwt(localStorage.getItem("access_token")));
    return parseJwt(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

export const signout = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("jwt");
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  }
};
