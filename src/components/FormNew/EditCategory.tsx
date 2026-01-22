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
import Icone from "../Icone";
import { useEffect, useRef, useState } from "react";
import useCategory from "../../Hooks/useCategory";
import SkeletonCustom from "../SkeletonCustom";

type CategoriaFormData = {
  name: string;
  type: number;
  cor: string;
  iconeId: string;
};
interface TransacaoDetailsProps {
  onClose: () => void;
}

const EditCategory = ({ onClose }: TransacaoDetailsProps) => {
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

  const { icone, buscarIcones, cores, buscarCores } = useCategory();

  const corSelecionada = watch("cor");
  const iconeSelecionado = watch("iconeId");

  const onSubmit = (data: CategoriaFormData) => {
    dispatch(postCategories(data));
    reset();
  };

  const iconeIsLoading = icone.status == "loading";
  const iconeIsError = icone.status == "failed";
  const iconeIsEmpy = icone.item.length == 0;
  const iconeHasData = icone.item.length > 0;

  const corIsLoading = cores.status == "loading";
  const corIsError = cores.status == "failed";
  const corIsEmpty = cores.item.length == 0;
  const corHasData = cores.item.length > 0;

  useEffect(() => {
    console.log("renderizou");
  }, []);

  useEffect(() => {
    if (icone.status == "idle") buscarIcones();
  }, [icone.status, buscarIcones]);

  useEffect(() => {
    if (cores.status == "idle") buscarCores();
  }, [cores.status, buscarCores]);

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
          <label htmlFor="cat-name">Nome da Categoria</label>
          <input id="cat-name" type="text" {...register("name")} />
          <span>{errors.name?.message}</span>
        </div>
        <div className="input-wrapper">
          <label htmlFor="categoria-desp">Tipo</label>
          <select id="categoria-desp" {...register("type")}>
            <option value={1}>Receita</option>
            <option value={0}>Despesa</option>
          </select>
          <span>{errors.type?.message}</span>
        </div>
        <div onClick={onClose} className="flex">
          <div className="flex column">
            <p className="label">Cor da categoria:</p>
            {corIsLoading && (
              <div className="items">
                <SkeletonCustom />
              </div>
            )}

            {(corIsError || corIsEmpty) && <p>{cores.error}</p>}

            {corHasData && (
              <div className="items">
                {cores.item.slice(0, 3).map((cor, index) => (
                  <ContainerCor
                    className={`${corSelecionada == cor.id ? "is-active" : ""}`}
                    onClick={() => {
                      setValue("cor", cor.id, { shouldValidate: true });
                    }}
                    key={index}
                    cor={cor.url}
                  />
                ))}
                <div
                  ref={colorRef}
                  className={`all-items shadow ${isColorSelectorVisible ? "is-visible" : ""}`}
                >
                  {cores.item.map((cor, index) => (
                    <ContainerCor
                      className={`${corSelecionada == cor.id ? "is-active" : ""}`}
                      onClick={() => {
                        setValue("cor", cor.id, { shouldValidate: true });
                        setIsColorSelectorVisible(false);
                      }}
                      key={index}
                      cor={cor.url}
                    />
                  ))}
                </div>
                <Button
                  padding="small"
                  onClick={() => {
                    setIsColorSelectorVisible(true);
                    setIsIconSelectorVisible(false);
                  }}
                  bgColor={colors.lightGray}
                  icon="plus"
                />
              </div>
            )}
          </div>
          <div className="flex column">
            <p className="label">Icone da categoria:</p>

            {(iconeIsError || iconeIsEmpy) && <p>{icone.error}</p>}

            {iconeIsLoading && (
              <div className="items">
                <SkeletonCustom />
              </div>
            )}

            {iconeHasData && (
              <div className="items">
                {icone.item.slice(0, 3).map((icone) => (
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
                  {icone.item.map((icone) => (
                    <Icone
                      onClick={() => {
                        setValue("iconeId", icone.url, {
                          shouldValidate: true,
                        });
                        setIsIconSelectorVisible(false);
                      }}
                      className={`${iconeSelecionado == icone.url ? "is-active" : ""}`}
                      key={icone.id}
                      tipoIcone={icone.url}
                    />
                  ))}
                </div>
                <Button
                  padding="small"
                  onClick={() => {
                    setIsIconSelectorVisible(true);
                    setIsColorSelectorVisible(false);
                  }}
                  bgColor={colors.lightGray}
                  icon="plus"
                />
              </div>
            )}
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

export default EditCategory;
