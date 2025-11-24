import { useDispatch, useSelector } from "react-redux";
import CardCategories from "../CardCategories";
import type { AppDispatch, RootReducer } from "../../Store";
import { useEffect } from "react";
import { fetchTransactions } from "../../Store/reducers/transactions";

const ContainerCategories = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <div className="grid-card">
      <CardCategories />
      <CardCategories type={0}/>
      <CardCategories type={1} />
      <CardCategories />
    </div>
  );
};

export default ContainerCategories;
