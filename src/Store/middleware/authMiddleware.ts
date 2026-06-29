import type { Middleware } from "@reduxjs/toolkit";
import { logout, refreshUsuario } from "../reducers/auth";
import { authStorage } from "../../Services/authStorage";
import type { AppDispatch } from "..";

let refreshing = false;



export const authMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (typeof action !== "object" || action === null || !("type" in action)) {
    return result;
  }

  const isRefreshRequest = 
    refreshUsuario.pending.match(action) ||
    refreshUsuario.fulfilled.match(action) ||
    refreshUsuario.rejected.match(action)

  if (action.type === logout.type || isRefreshRequest) {
    return result;
  }

  if(refreshing)
    return result;

  const refresh = authStorage.getRefresh();

  if (authStorage.isExpired()) {
    if(refresh?.trim()) {
      refreshing = true;
      const payload = {
        refreshToken: refresh,
        system: "fin"
      };

      (store.dispatch as AppDispatch)(refreshUsuario(payload))
      .unwrap()
      .catch(() => {
        store.dispatch(logout())
      })
      .finally(() => {
        refreshing = false;
      })
    } else {
      store.dispatch(logout())
  }
  return result;
  } 
}
