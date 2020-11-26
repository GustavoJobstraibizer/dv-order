import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import categoriesService from "../../services/categories";
import app from "../../utils/firebaseUtils";
import { Icon } from "./styles";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const inputCategory = useRef();

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

  function handleSubmit() {
    if (isEditing) {
      editCategorie();
    } else {
      saveCategorie();
    }
  }

  async function editCategorie() {
    try {
      await categoriesService.edit(categorie, inputCategory.current.value);
      toast.success("Registro editado com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      inputCategory.current.value = "";
      setIsEditing(false);
    }
  }

  async function saveCategorie() {
    try {
      await categoriesService.store(inputCategory.current.value);
      toast.success("Registro salvo com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      inputCategory.current.value = "";
    }
  }

  function handleEdit(categorie) {
    setCategorie(categorie);
    setIsEditing(true);

    inputCategory.current.value = categorie.description;
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
        <Form className="text-left mt-3">
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Descrição</Form.Label>
            <Form.Control
              type="text"
              placeholder="Informe a descrição da categoria"
              name="description"
              ref={inputCategory}
            />
          </Form.Group>

          <Button
            type="button"
            onClick={handleSubmit}
            size="sm"
            variant="primary"
          >
            Salvar
          </Button>
        </Form>

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
