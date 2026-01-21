import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../globalStyles";
import Button from "../Button";
import { postCategories } from "../../Store/reducers/categories";
import { type AppDispatch } from "../../Store";
import { categoriaSchema } from "../../validations/categoriaSchema";
import Formulario from "../Formulario";
import ContainerCor from "../ContainerCor";
import Icone, { type IconType } from "../Icone";
import { useEffect, useRef, useState } from "react";

const DESPESA_COLORS = [
  "#e63946",
  "#ff6b6b",
  "#c850c0",
  "#d6336c",
  "#9b59b6",
  "#8e44ad",
  "#f06292",
  "#ff4d4d",
];

const RECEITA_COLORS = [
  "#57b846",
  "#6fcf97",
  "#27ae60",
  "#3498db",
  "#5dade2",
  "#f39c12",
  "#f1c40f",
  "#2ecc71",
];

type TipoMock = {
  id: string;
  name: string;
  url: IconType;
};

const ICONES_MOCK: TipoMock[] = [
  {
    id: "a02a55eb-c8ab-4e7e-ac92-8c3203d7be79",
    name: "carro",
    url: "faCar",
  },
  {
    id: "0988528d-0b1c-4857-81b7-bfc5a7e25e3c",
    name: "camisa",
    url: "faShirt",
  },
  {
    id: "9c3b380d-b956-4c58-aaf1-6a3ac9899361",
    name: "garfo",
    url: "faUtensils",
  },
  {
    id: " 26d19923-8335-4ed5-a989-c3cc6d506359",
    name: "remedio",
    url: "faCapsules",
  },
  {
    id: " e01532bb-f66c-487e-9ff8-8139bf288cbe",
    name: "casa",
    url: "faHouse",
  },
  {
    id: "2bc15312-130e-4238-8d8d-ef46553627e2",
    name: "livro",
    url: "faBook",
  },
];

const cores = [...RECEITA_COLORS, ...DESPESA_COLORS];

type CategoriaFormData = {
  name: string;
  type: number;
  cor: string;
  iconeId: string;
};

const FormCategoria = () => {
  const dispatch = useDispatch<AppDispatch>();
  const colorRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const [isColorSelectorVisible, setIsColorSelectorVisible] = useState(false);
  const [isIconSelectorVisible, setIsIconSelectorVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<CategoriaFormData>({
    resolver: yupResolver(categoriaSchema),
  });

  const corSelecionada = watch("cor");
  const iconeSelecionado = watch("iconeId");

  const onSubmit = (data: CategoriaFormData) => {
    dispatch(postCategories(data));
    reset();
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (
        isColorSelectorVisible &&
        colorRef.current &&
        !colorRef.current.contains(target)
      ) {
        setIsColorSelectorVisible(false);
      }

      if (
        isIconSelectorVisible &&
        iconRef.current &&
        !iconRef.current.contains(target)
      ) {
        setIsIconSelectorVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isColorSelectorVisible, isIconSelectorVisible]);

  return (
    <>
      <Formulario size="small" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper">
          <label htmlFor="categoria-desp">Tipo</label>
          <select id="categoria-desp" {...register("type")}>
            <option value={1}>Receita</option>
            <option value={0}>Despesa</option>
          </select>
          <span>{errors.type?.message}</span>
        </div>

        <div className="input-wrapper">
          <label htmlFor="cat-name">Nome da Categoria</label>
          <input id="cat-name" type="text" {...register("name")} />
          <span>{errors.name?.message}</span>
        </div>
        <div className="flex">
          <div className="flex column">
            <p className="label">Cor da categoria:</p>
            <div className="items">
              {cores.slice(0, 3).map((cor, index) => (
                <ContainerCor
                  className={`${corSelecionada == cor ? "is-active" : ""}`}
                  onClick={() => {
                    setValue("cor", cor, { shouldValidate: true });
                  }}
                  key={index}
                  cor={cor}
                />
              ))}
              <div
                ref={colorRef}
                className={`all-items shadow ${isColorSelectorVisible ? "is-visible" : ""}`}
              >
                {cores.map((cor, index) => (
                  <ContainerCor
                    className={`${corSelecionada == cor ? "is-active" : ""}`}
                    onClick={() => {
                      setValue("cor", cor, { shouldValidate: true });
                      setIsColorSelectorVisible(false);
                    }}
                    key={index}
                    cor={cor}
                  />
                ))}
              </div>
              <Button
                onClick={() => {
                  setIsColorSelectorVisible(true);
                  setIsIconSelectorVisible(false);
                }}
                bgColor={colors.lightGray}
                icon="plus"
              />
            </div>
          </div>
          <div className="flex column">
            <p className="label">Icone da categoria:</p>
            <div className="items">
              {ICONES_MOCK.slice(0, 3).map((icone) => (
                <Icone
                  onClick={() => {
                    setValue("iconeId", icone.url, { shouldValidate: true });
                  }}
                  className={`${iconeSelecionado == icone.url ? "is-active" : ""}`}
                  key={icone.id}
                  tipoIcone={icone.url}
                />
              ))}
              <div
                ref={iconRef}
                className={`all-items shadow ${isIconSelectorVisible ? "is-visible" : ""}`}
              >
                {ICONES_MOCK.map((icone) => (
                  <Icone
                    onClick={() => {
                      setValue("iconeId", icone.url, { shouldValidate: true });
                      setIsIconSelectorVisible(false);
                    }}
                    className={`${iconeSelecionado == icone.url ? "is-active" : ""}`}
                    key={icone.id}
                    tipoIcone={icone.url}
                  />
                ))}
              </div>
              <Button
                onClick={() => {
                  setIsIconSelectorVisible(true);
                  setIsColorSelectorVisible(false);
                }}
                bgColor={colors.lightGray}
                icon="plus"
              />
            </div>
          </div>
        </div>

        <Button
          padding="small"
          bgColor={colors.verde}
          type="submit"
          children="Adicionar Categoria"
        />
      </Formulario>
    </>
  );
};

export default FormCategoria;
