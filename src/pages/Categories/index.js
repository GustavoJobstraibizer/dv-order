import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  Table,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import categoriesService from "../../services/categories";
import app from "../../utils/firebaseUtils";
import { Icon } from "./styles";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // const inputCategory = useRef();
  const { register, handleSubmit, errors, watch, control } = useForm();

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

  // function handleSubmit() {
  //   if (isEditing) {
  //     editCategorie();
  //   } else {
  //     saveCategorie();
  //   }
  // }
  const onSubmit = (data) => {
    console.log(data);
  };

  async function editCategorie() {
    try {
      // await categoriesService.edit(categorie, inputCategory.current.value);
      toast.success("Registro editado com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      // inputCategory.current.value = "";
      setIsEditing(false);
    }
  }

  async function saveCategorie() {
    try {
      // await categoriesService.store(inputCategory.current.value);
      toast.success("Registro salvo com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      // inputCategory.current.value = "";
    }
  }

  function handleEdit(categorie) {
    setCategorie(categorie);
    setIsEditing(true);

    // inputCategory.current.value = categorie.description;
  }

  async function handleRemove(categorie) {
    try {
      await categoriesService.remove(categorie.id);
      toast.success("Registro deletado com sucesso");
    } catch (err) {
      toast.error("Erro ao deletar registro");
    }
  }

  return (
    <>
      <Container>
        {/* <Jumbotron>
          <h2>Dados das categorias</h2>
        </Jumbotron> */}

        <Card className="mt-2">
          <Card.Header>Dados de categorias</Card.Header>
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            {/* <Card.Text>
              With supporting text below as a natural lead-in to additional content.
            </Card.Text> */}
            {/* <Button variant="primary">Go somewhere</Button> */}

            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="text-left mt-3"
              noValidate
            >
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Descrição</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true, maxLength: 50 }}
                  defaultValue={""}
                  as={<FormControl isInvalid={!!errors.description} />}
                />
                {/* <Form.Control
                  type="text"
                  name="description"
                  className="col-4"
                  ref={register({
                    required: "Campo obrigatório",
                    maxLength: 50,
                  })}
                /> */}

                {errors.description && (
                  <small className="invalid-feedback">Campo obrigatório</small>
                )}
              </Form.Group>

              <Button type="submit" size="sm" variant="primary">
                Salvar
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <Table bordered hover className="mt-2">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((categorie) => (
              <tr key={categorie.id}>
                <td>{categorie.description}</td>
                <td>
                  <Icon
                    onClick={() => handleEdit(categorie)}
                    className="text-info mr-2"
                    icon={faEdit}
                  />
                  <Icon
                    onClick={() => handleRemove(categorie)}
                    className="text-danger"
                    icon={faTrashAlt}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
