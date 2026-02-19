import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootReducer } from "../Store";
import { getUserData } from "../Store/reducers/user";
import { useEffect } from "react";

const useUser = () => {
  const { fetch } = useSelector((state: RootReducer) => state.usuarios);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (fetch.status == "idle") dispatch(getUserData());
  }, [fetch.status, dispatch]);

  return {
    fetch,
  };
};

export default useUser;
