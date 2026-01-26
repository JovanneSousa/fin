import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { colors } from "../../globalStyles";
import Button from "../Button";
import {
  categoriaSchema,
  type CategoriaFormData,
} from "../../validations/categoriaSchema";
import Formulario from "../Formulario";
import ContainerCor from "../ContainerCor";
import Icone from "../Icone";
import { useEffect, useMemo, useRef, useState } from "react";
import useCategory from "../../Hooks/useCategory";
import SkeletonCustom from "../SkeletonCustom";
import useClickOutside from "../../Hooks/useClickOutside";
import Loader from "../Loader";
import Feedback from "../Feedback";

const EditCategory = () => {
  const colorRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const [isColorSelectorVisible, setIsColorSelectorVisible] = useState(false);
  const [isIconSelectorVisible, setIsIconSelectorVisible] = useState(false);
  useClickOutside([
    {
      ref: colorRef,
      isOpen: isColorSelectorVisible,
      onClose: () => setIsColorSelectorVisible(false),
    },
    {
      ref: iconRef,
      isOpen: isIconSelectorVisible,
      onClose: () => setIsIconSelectorVisible(false),
    },
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(categoriaSchema),
  });

  const {
    icone,
    buscarIcones,
    cores,
    buscarCores,
    itemById,
    atualizaCategoria,
  } = useCategory();

  const corSelecionada = watch("corId");
  const iconeSelecionado = watch("iconId");

  const onSubmit = (data: CategoriaFormData) => {
    if (!itemById.item) return;

    atualizaCategoria.atualizarCategoria(data, itemById.item?.id);
    reset();
  };

  const isLoading = atualizaCategoria.status == "loading";
  const isError = atualizaCategoria.status == "failed";
  const isSuccess = atualizaCategoria.status == "succeeded";
  const errorMessage = atualizaCategoria.error;
  const successMessage = atualizaCategoria.success;

  const iconeIsLoading = icone.status == "loading";
  const iconeIsError = icone.status == "failed";
  const iconeIsEmpy = icone.item.length == 0;
  const iconeHasData = icone.item.length > 0;

  const corIsLoading = cores.status == "loading";
  const corIsError = cores.status == "failed";
  const corIsEmpty = cores.item.length == 0;
  const corHasData = cores.item.length > 0;

  useEffect(() => {
    if (icone.status == "idle") buscarIcones();
  }, [icone.status, buscarIcones]);

  useEffect(() => {
    if (cores.status == "idle") buscarCores();
  }, [cores.status, buscarCores]);

  useEffect(() => {
    if (itemById.item) {
      reset({
        corId: itemById.item.cor.id,
        iconId: itemById.item.icone.id,
        name: itemById.item.name,
        type: itemById.item.type,
      });
    }
  }, [itemById.item, reset]);

  const coresOrdenadas = useMemo(() => {
    if (!corSelecionada) return cores.item;

    return [
      ...cores.item.filter((c) => c.id === corSelecionada),
      ...cores.item.filter((c) => c.id !== corSelecionada),
    ];
  }, [cores.item, corSelecionada]);

  const iconesOrdenados = useMemo(() => {
    if (!iconeSelecionado) return icone.item;
    return [
      ...icone.item.filter((i) => i.id === iconeSelecionado),
      ...icone.item.filter((i) => i.id !== iconeSelecionado),
    ];
  }, [icone.item, iconeSelecionado]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Feedback error={errorMessage} />
      ) : isSuccess ? (
        <Feedback success={successMessage!} />
      ) : (
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
          <div className="flex">
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
                  {coresOrdenadas.slice(0, 3).map((cor, index) => (
                    <ContainerCor
                      className={`${corSelecionada == cor.id ? "is-active" : ""}`}
                      onClick={() => {
                        setValue("corId", cor.id, { shouldValidate: true });
                      }}
                      key={index}
                      cor={cor.url}
                    />
                  ))}
                  <div
                    ref={colorRef}
                    className={`all-items shadow ${isColorSelectorVisible ? "is-visible" : ""}`}
                  >
                    {coresOrdenadas
                      .slice()
                      .sort((a, b) => {
                        if (a.id === corSelecionada) return -1;
                        if (b.id === corSelecionada) return 1;
                        return 0;
                      })
                      .map((cor, index) => (
                        <ContainerCor
                          className={`${corSelecionada == cor.id ? "is-active" : ""}`}
                          onClick={() => {
                            setValue("corId", cor.id, { shouldValidate: true });
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
                  {iconesOrdenados.slice(0, 3).map((icone) => (
                    <Icone
                      onClick={() => {
                        setValue("iconId", icone.id, { shouldValidate: true });
                      }}
                      className={`${iconeSelecionado == icone.id ? "is-active" : ""}`}
                      key={icone.id}
                      tipoIcone={icone.url}
                    />
                  ))}
                  <div
                    ref={iconRef}
                    className={`all-items shadow ${isIconSelectorVisible ? "is-visible" : ""}`}
                  >
                    {iconesOrdenados.map((icone) => (
                      <Icone
                        onClick={() => {
                          setValue("iconId", icone.id, {
                            shouldValidate: true,
                          });
                          setIsIconSelectorVisible(false);
                        }}
                        className={`${iconeSelecionado == icone.id ? "is-active" : ""}`}
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

          <Button padding="small" bgColor={colors.verde} type="submit">
            Atualizar Categoria
          </Button>
        </Formulario>
      )}
    </>
  );
};

export default EditCategory;
