import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { useEffect, useRef } from "react";
import Modal from "../../components/ModalContainer";
import FormNew from "../../components/FormNew";
import { useFormNew } from "../../contexts/FormNew/useFormNew";
import useTransactions from "../../Hooks/useTransactions";
import { subtraiMeses, ultimoDiaMesAtual } from "../../Utils/Datas";

export type Tabs = "dashboard" | "transacoes" | "categorias" | "planejamento";

const DefaultLayout = () => {
  const mainRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const { fechaModal, isOpenModal } = useFormNew();

  const path = location.pathname;

  const activeTabMap: Record<string, Tabs> = {
    "/transacoes": "transacoes",
    "/dashboard": "dashboard",
    "/categorias": "categorias",
  };

  const activeTab =
    Object.entries(activeTabMap).find(([route]) =>
      path.startsWith(route),
    )?.[1] ?? "dashboard";

  const {
    itemsPeriodo: { statusPeriodo },
    itemsPeriodoComparativo: { statusComparativo },
    filtros: { aplicarPeriodoComparativo, aplicarPeriodo },
    categorias: { buscaCategorias, status },
  } = useTransactions();
  // busca dados de transações
  useEffect(() => {
    if (statusPeriodo == "idle") {
      const inicio = subtraiMeses(ultimoDiaMesAtual(), 1);
      const fim = ultimoDiaMesAtual();
      aplicarPeriodo(inicio, fim);
    }
  }, [statusPeriodo, aplicarPeriodo]);

  // busca dados de gráfico de linha
  useEffect(() => {
    if (statusComparativo == "idle") aplicarPeriodoComparativo(3);
  }, [statusComparativo, aplicarPeriodoComparativo]);

  // busca as categorias
  useEffect(() => {
    if (status == "idle") buscaCategorias();
  }, [status, buscaCategorias]);

  return (
    <>
      <Sidebar activeTab={activeTab} />
      <div className="main" ref={mainRef}>
        <Header activeTabs={activeTab} scrollRef={mainRef} />
        <div className="col container">
          <Outlet />
        </div>
      </div>
      <Modal onClose={fechaModal} isOpen={isOpenModal !== null}>
        {isOpenModal && <FormNew onClose={fechaModal} typeForm={isOpenModal} />}
      </Modal>
    </>
  );
};
export default DefaultLayout;
