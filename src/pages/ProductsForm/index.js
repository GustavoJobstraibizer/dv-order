import { useEffect, useRef, useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productService from "../../services/product.service";
import app from "../../utils/firebaseUtils";

export default function ProductsForm() {
  const { id } = useParams();

  console.log(id);

  const [categories, setCategories] = useState([]);
  const [productId, setProductId] = useState(id);
  const [product, setProduct] = useState(null);

  let defaultValues = {
    categoryId: "",
    name: "",
    price: "",
    description: "",
    file: "",
  };

  const {
    control,
    handleSubmit,
    errors,
    register,
    getValues,
    setValue,
    reset,
  } = useForm({
    ...defaultValues,
  });

  const imgPreview = useRef();

  useEffect(() => {
    const db = app.firestore();
    return db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) =>
        categoriesData.push({ ...doc.data(), id: doc.id })
      );
      setCategories(categoriesData);
    });
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      const db = app.firestore();
      const ref = await db.doc(`products/${productId}`).get();
      const data = ref.data();
      setProduct(data);
      setValue("name", data.name);
    };

    getProduct();
  }, [productId]);

  const handleSelectFile = () => {
    const file = getValues("file");
    const reader = new FileReader();
    reader.onload = function () {
      imgPreview.current.src = reader.result;
    };

    reader.readAsDataURL(file[0]);
  };

  const onSubmit = async (data) => {
    try {
      await productService.store(data);
      toast.success("Registro salvo com sucesso");
      // reset(defaultValues);
    } catch (err) {
      toast.error("Erro ao cadastrar produto. Tente mais tarde.");
    }
  };

  return (
    <>
      <Container>
        <Card className="mt-2">
          <Card.Header>Produtos</Card.Header>

          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Form.Row>
                <Form.Group
                  className="col-5"
                  controlId="exampleForm.SelectCustom"
                >
                  <Form.Label>Categoria</Form.Label>
                  <Controller
                    name="categoryId"
                    control={control}
                    rules={{ required: true }}
                    defaultValue={""}
                    as={
                      <FormControl
                        as="select"
                        custom
                        isInvalid={!!errors.categoryId}
                      >
                        <option value="">Selecione a categoria</option>
                        {categories.map((categorie) => (
                          <option key={categorie.id} value={categorie.id}>
                            {categorie.description}
                          </option>
                        ))}
                      </FormControl>
                    }
                  ></Controller>
                  {errors.categoryId && (
                    <small className="invalid-feedback">
                      Campo obrigatório
                    </small>
                  )}
                </Form.Group>

                <Form.Group className="col-7">
                  <Form.Label>Nome</Form.Label>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={defaultValues.name}
                    rules={{ required: true, maxLength: 200 }}
                    as={
                      <FormControl
                        className="col-12"
                        isInvalid={!!errors.name}
                      />
                    }
                  />

                  {errors.name && (
                    <small className="invalid-feedback">
                      Campo obrigatório
                    </small>
                  )}
                </Form.Group>
              </Form.Row>

              <Form.Group>
                <Form.Label>Preço</Form.Label>
                <Controller
                  name="price"
                  control={control}
                  rules={{ required: true, maxLength: 200 }}
                  defaultValue={""}
                  as={
                    <FormControl
                      type="number"
                      className="col-12"
                      isInvalid={!!errors.price}
                    />
                  }
                />

                {errors.price && (
                  <small className="invalid-feedback">Campo obrigatório</small>
                )}
                {/* <Form.Control type="number" name="price" /> */}
              </Form.Group>

              <Form.Group>
                <Card className="col-4">
                  <Card.Body
                    className="d-flex justify-content-center"
                    style={{ height: "120px", width: "100%" }}
                  >
                    <Card.Img
                      style={{
                        maxWidth: "100px",
                        width: "100%",
                        borderRadius: 0,
                      }}
                      ref={imgPreview}
                      variant="top"
                    />
                  </Card.Body>
                  <Card.Footer>
                    <label className="btn btn-success">
                      Selecionar imagem
                      <input
                        type="file"
                        name="file"
                        ref={register({ required: true })}
                        onChange={handleSelectFile}
                        onClick={() => control.setValue("file", "")}
                        hidden
                      />
                    </label>
                  </Card.Footer>
                </Card>
              </Form.Group>

              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true, maxLength: 200 }}
                  defaultValue={""}
                  as={
                    <Form.Control
                      as="textarea"
                      name="description"
                      rows={3}
                      aria-describedby="descriptionProduct"
                    />
                  }
                />
                <Form.Text id="descriptionProduct" muted>
                  Informe neste campo mais detalhes sobre este produto.
                </Form.Text>
              </Form.Group>

              <Button
                type="submit"
                size="sm"
                variant="primary"
                className="mr-2"
              >
                Salvar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
