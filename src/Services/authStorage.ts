import type { LoginResponse } from "../Store/reducers/auth";

export const authStorage = {
  save(token: LoginResponse["data"]["token"]) {
    localStorage.setItem("token", token.accessToken);
    localStorage.setItem("claims", JSON.stringify(token.userToken));
    localStorage.setItem("user", token.userToken.name);
    localStorage.setItem("userId", token.userToken.id);
    localStorage.setItem(
      "expiresIn",
      (Date.now() + token.expiresIn * 1000).toString(),
    );
  },

  clear() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresIn");
  },

  isExpired() {
    const expiresIn = Number(localStorage.getItem("expiresIn"));
    return !expiresIn || Date.now() >= expiresIn;
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  hydrate() {
    if (this.isExpired()) {
      this.clear();
      return {
        isAuthenticated: false,
        user: null,
      };
    }

    const user = localStorage.getItem("user");
    const userId = localStorage.getItem("userId");
    if (!user || !userId) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }

    return {
      isAuthenticated: true,
      user: {
        id: userId,
        name: user,
      },
    };
  },
};
