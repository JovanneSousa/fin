import CardCategories from "../CardCategories";

const ContainerCategories = () => {
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
