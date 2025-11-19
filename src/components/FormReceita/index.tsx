const FormReceita = () => {
  return (
    <form>
      <div className="input-wrapper">
        <label htmlFor="descript">Descrição</label>
        <input id="descript" type="text" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="value">Valor</label>
        <input id="value" type="number" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="">Categoria</label>
        <select>
          <option>Selecione uma categoria</option>
          <option>Salario</option>
          <option>Freelance</option>
          <option>Investimento</option>
          <option>Outro</option>
        </select>
      </div>
      <div className="input-wrapper">
        <label htmlFor="date">Data</label>
        <input id="date" type="date" />
      </div>
      <div className="input-wrapper">
        <label htmlFor="recurrency"></label>
        <input id="recurrency" type="checkbox" />
      </div>
    </form>
  );
};

export default FormReceita
