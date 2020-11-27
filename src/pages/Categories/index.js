import { useState } from "react";
import { Button, Card, Container, Form, FormControl } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ListCategories from "../../components/ListCategories";
import categoriesService from "../../services/categories";

export default function Categories() {
  const [categorie, setCategorie] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    if (isEditing) {
      editCategorie(data);
    } else {
      saveCategorie(data);
    }
  };

  const editCategorie = async (data) => {
    try {
      await categoriesService.edit(categorie, data.description);
      toast.success("Registro editado com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      control.setValue("description", "");
      setIsEditing(false);
    }
  };

  const saveCategorie = async (data) => {
    try {
      await categoriesService.store(data.description);
      toast.success("Registro salvo com sucesso");
    } catch (err) {
      toast.error("Erro ao editar registro");
    } finally {
      control.setValue("description", "");
    }
  };

  const handleEdit = (categorie) => {
    setCategorie(categorie);
    setIsEditing(true);
    control.setValue("description", categorie.description);
  };

  const handleRemove = async (categorie) => {
    try {
      await categoriesService.remove(categorie.id);
      toast.success("Registro deletado com sucesso");
    } catch (err) {
      toast.error("Erro ao deletar registro");
    } finally {
      setIsEditing(false);
      control.setValue("description", "");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    control.setValue("description", "");
  };

  return (
    <>
      <Container>
        <Card className="mt-2">
          <Card.Header>Categorias</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} className="mt-3" noValidate>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Descrição</Form.Label>
                <Controller
                  name="description"
                  control={control}
                  rules={{ required: true, maxLength: 50 }}
                  defaultValue={""}
                  as={<FormControl className="col-6" isInvalid={!!errors.description} />}
                />

                {errors.description && <small className="invalid-feedback">Campo obrigatório</small>}
              </Form.Group>

              <Button type="submit" size="sm" variant="primary" className="mr-2">
                Salvar
              </Button>
              {isEditing && (
                <Button type="button" size="sm" variant="outline-secondary" onClick={handleCancel}>
                  Cancelar
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>

        <ListCategories handleEdit={handleEdit} handleRemove={handleRemove} />
      </Container>
    </>
  );
}
