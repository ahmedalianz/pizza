import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

import axios from "axios";
import importedStyles from "styles/Admin.module.css";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        {
          adminName: name,
          adminPassword: password,
        }
      );
      res.status === 200 && router.push("/admin");
    } catch (err) {
      console.log(err);
      setError("Wrong Credentials");
    }
  };
  return (
    <Container>
      <Row className={importedStyles.container}>
        <Col md="6" className="my-5">
          <Form onSubmit={loginAdmin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <FloatingLabel
                controlId="floatingInput"
                label="Admin Name"
                className="mb-3"
              >
                <Form.Control
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter email"
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </FloatingLabel>
            </Form.Group>
            <div className="my-2 text-danger">{error}</div>
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="w-50">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
export const getServerSideProps = async (ctx) => {
  let myCookies = ctx.req.cookies || "";
  if (myCookies.token === process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
