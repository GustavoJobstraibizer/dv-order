import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import app from "../../utils/firebaseUtils";

export default function ListProducts() {
  let history = useHistory();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const getReference = async (path) => {
        const res = await db.doc(path).get();
        const data = res.data();
        return data;
      };

      const db = app.firestore();

      const res = await db.collection("products").get();

      const listItems = await Promise.all(
        res.docs.map(async (doc) => {
          let item = doc.data();
          const result = await getReference(item.category.path);
          item = { ...item, id: doc.id, category: result };
          return item;
        })
      );

      setProducts(listItems);
    };

    getProducts();
  }, []);

  const handleEdit = (product) => {
    history.push(`produto/${product.id}`);
  };

  return (
    <>
      <Link className="btn btn-success" to="/produto">
        Novo
      </Link>
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category?.description}</td>
              <td>
                <FontAwesomeIcon
                  onClick={() => handleEdit(product)}
                  className="text-info mr-2"
                  icon={faEdit}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
