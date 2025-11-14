import Button from "../Button";

const FormRegister = () => {
  return (
    <form>
      <input type="text" placeholder="Nome" id="nome" />
      <input type="email" placeholder="Email" id="email" />
      <input type="password" placeholder="Senha" id="senha" />
      <input
        type="password"
        placeholder="Confirme a senha"
        id="confirm-senha"
      />
      <Button children="Cadastrar" type="submit" />
    </form>
  );
};

export default FormRegister;
