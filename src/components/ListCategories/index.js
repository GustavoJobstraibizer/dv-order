import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import app from "../../utils/firebaseUtils";
import ModalConfirm from "../ModalConfirm";
import { Icon } from "./styles";

export default function ListCategories({ handleEdit, handleRemove }) {
  const [categories, setCategories] = useState([]);
  const [categorie, setCategorie] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    const db = app.firestore();
    return db.collection("categories").onSnapshot((snapshot) => {
      const categoriesData = [];
      snapshot.forEach((doc) => categoriesData.push({ ...doc.data(), id: doc.id }));
      setCategories(categoriesData);
    });
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  const handleConfirmDelete = (categorie) => {
    setShow(true);
    setCategorie(categorie);
  };

  const handleConfirm = () => {
    setShow(false);
    handleRemove(categorie);
  };

  return (
    <>
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
                <Icon onClick={() => handleEdit(categorie)} className="text-info mr-2" icon={faEdit} />
                <Icon onClick={() => handleConfirmDelete(categorie)} className="text-danger" icon={faTrashAlt} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ModalConfirm show={show} title="Deletar categoria" handleClose={handleClose} handleConfirm={handleConfirm}>
        Confirma a exclusão do registro?
      </ModalConfirm>
    </>
  );
}
