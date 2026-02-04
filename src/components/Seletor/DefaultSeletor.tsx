// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { colors } from "../../globalStyles";
// import Button from "../Button";
// import { SeletorSection } from "./styles";
// import ButtonPill from "../ButtonPill";
// import { faCalendar } from "@fortawesome/free-solid-svg-icons";
// import type { BaseSeletorProps } from ".";
// import { useState } from "react";

// const DefaultSeletor = ({
//   handle,
//   aplicarPeriodo,
//   aplicarMes,
//   mesSelecionado,
//   titlePeriod,
//   pillAtiva,
//   setPillAtiva,
// }: BaseSeletorProps) => {
//   const [isFilterPeriodoActive, setIsFilterPeriodoActive] = useState(false);
//   const [dataInicio, setDataInicio] = useState("");
//   const [dataFim, setDataFim] = useState("");

//   const { onNextMonth, onPrevMonth } = handle;

//   const handleSelectMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     if (!e.target.value) return;

//     const [year, month] = e.target.value.split("-").map(Number);

//     aplicarMes(new Date(year, month, 1));
//   };

//   const filtrarMesAtual = () => {
//     aplicarMes(new Date());
//     setPillAtiva("mes-atual");
//   };

//   const filtrarIntervaloMeses = (qtd: number) => {
//     const fim = new Date();
//     const inicio = new Date(fim.getFullYear(), fim.getMonth() - qtd, 1);
//     aplicarPeriodo(inicio, fim);
//     setPillAtiva(`${qtd}m`);
//   };

//   const aplicarFiltroPeriodo = (e: React.FormEvent) => {
//     e.preventDefault();
//     aplicarPeriodo(new Date(dataInicio), new Date(dataFim));
//     setIsFilterPeriodoActive(true);
//   };

//   const gerarMesesSelect = () => {
//     const meses = [];
//     const hoje = new Date();

//     for (let i = 1; i <= 6; i++) {
//       const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);

//       meses.push({
//         label: data.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
//         year: data.getFullYear(),
//         month: data.getMonth(),
//       });
//     }

//     for (let i = 1; i <= 6; i++) {
//       const data = new Date(hoje.getFullYear(), hoje.getMonth() + i, 1);

//       meses.push({
//         label: data.toLocaleString("pt-BR", { month: "long", year: "numeric" }),
//         year: data.getFullYear(),
//         month: data.getMonth(),
//       });
//     }

//     return meses;
//   };

//   const meses = gerarMesesSelect();

//   return (
//     <SeletorSection page="default" positionTitle="space-between">
//       <div className="container-title">
//         <div className="title-mes">
//           <Button
//             className="prev"
//             padding="small"
//             bgColor={colors.lightGray}
//             type="button"
//             icon="left"
//             onClick={onPrevMonth}
//           />
//           <p>
//             {titlePeriod ? (
//               "Filtro por periodo"
//             ) : (
//               <>
//                 <strong>
//                   {mesSelecionado.toLocaleString("pt-BR", { month: "long" })}
//                 </strong>{" "}
//                 de {mesSelecionado.getFullYear()}
//               </>
//             )}
//           </p>
//           <Button
//             className="next"
//             padding="small"
//             bgColor={colors.lightGray}
//             type="button"
//             icon="right"
//             onClick={onNextMonth}
//           />
//         </div>
//         <div className="input-mes">
//           <FontAwesomeIcon icon={faCalendar} className="icon-left" />
//           <select onChange={handleSelectMonth} id="mes">
//             <option value="">Selecionar mês</option>
//             {meses
//               .sort((a, b) => b.year - a.year || b.month - a.month)
//               .map((m) => (
//                 <option
//                   key={`${m.year} - ${m.month}`}
//                   value={`${m.year}-${m.month}`}
//                 >
//                   {m.label}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </div>
//       <div className="container-pill">
//         <ButtonPill
//           className={pillAtiva === "mes-atual" ? "is-active" : ""}
//           children="Mês Atual"
//           onClick={filtrarMesAtual}
//         />
//         <ButtonPill
//           children="3 Meses"
//           onClick={() => filtrarIntervaloMeses(3)}
//           className={pillAtiva === "3m" ? "is-active" : ""}
//         />
//         <ButtonPill
//           children="6 Meses"
//           onClick={() => filtrarIntervaloMeses(6)}
//           className={pillAtiva === "6m" ? "is-active" : ""}
//         />
//         <ButtonPill
//           children="1 Ano"
//           onClick={() => filtrarIntervaloMeses(12)}
//           className={pillAtiva === "12m" ? "is-active" : ""}
//         />
//       </div>
//       {!isFilterPeriodoActive ? (
//         <Button
//           bgColor={colors.lightGray}
//           padding="small"
//           type="button"
//           onClick={() => setIsFilterPeriodoActive(true)}
//           icon={"down"}
//           children="Filtrar por periodo"
//         />
//       ) : (
//         <Button
//           onClick={() => setIsFilterPeriodoActive(false)}
//           bgColor={colors.lightGray}
//           padding="small"
//           type="button"
//           icon="up"
//           children="Fechar Filtro"
//         />
//       )}

//       <form
//         className={`content ${isFilterPeriodoActive ? "is-active" : ""}`}
//         onSubmit={aplicarFiltroPeriodo}
//       >
//         <div className="input-container">
//           <div className="input-wrapper">
//             <label htmlFor="date">Data Inicial</label>
//             <input
//               id="date"
//               type="date"
//               value={dataInicio}
//               onChange={(e) => setDataInicio(e.target.value)}
//             />
//           </div>
//           <div className="input-wrapper">
//             <label htmlFor="date">Data Final</label>
//             <input
//               id="date"
//               type="date"
//               value={dataFim}
//               onChange={(e) => setDataFim(e.target.value)}
//             />
//           </div>
//         </div>
//         <Button
//           bgColor={colors.verde}
//           padding="small"
//           type="submit"
//           children="Aplicar Período"
//         />
//       </form>
//     </SeletorSection>
//   );
// };

// export default DefaultSeletor;
