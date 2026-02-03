import type { Middleware } from "@reduxjs/toolkit";
import { logout } from "../reducers/auth";
import { authStorage } from "../../Services/authStorage";

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action !== "object" || action === null || !("type" in action)) {
    return result;
  }

  if (action.type === logout.type) {
    return result;
  }

  if (authStorage.isExpired()) {
    store.dispatch(logout());
  }

  return result;
};
