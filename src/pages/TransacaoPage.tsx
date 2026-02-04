import ContainerCategories from "../components/ContainerCategories";
import Transacoes from "../components/Transacoes";
import useIsMobile from "../Hooks/useIsMobile";

const TransacaoPage = () => {
  const isMobile = useIsMobile();
  return (
    <>
      {!isMobile && <ContainerCategories />}
      <Transacoes />
    </>
  );
};

export default TransacaoPage;
