import { useCallback, useContext } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Auth";
import app from "../../utils/firebaseUtils";
import { Container } from "./styles";

export default function SignIn({ history }) {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        if (history) {
          history.push("/");
        }
      } catch (e) {
        if (e?.code === "auth/invalid-email") {
          toast.error("E-mail inválido");
          return;
        }

        if (e?.code === "auth/wrong-password") {
          toast.error("Password inválido");
          return;
        }
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <Card className="d-flex justify-content-center align-items-center content-card-login">
        <Card.Body className="w-100">
          <Card.Title>Login</Card.Title>
          <Card.Subtitle>
            <small>Faça Login para continuar</small>
          </Card.Subtitle>

          <Form className="text-left mt-3" onSubmit={handleLogin}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control type="email" placeholder="E-mail" name="email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Senha"
              />
            </Form.Group>

            <Button type="submit" className="w-100" size="sm" variant="primary">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
