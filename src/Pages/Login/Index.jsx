import React from "react";
import styles from "./styles.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Botao from "../../components/buttons/Botao";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const validationSchemaLogin = z.object({
    email: z.string().email({ message: "E-mail obrigatório" }),
    senha: z.string().min(6, { message: "Senha obrigatória" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    criteriaMode: "All",
    resolver: zodResolver(validationSchemaLogin),
    defaultValue: {
      email: "",
      senha: "",
    },
  });

  const redirectRegister = () => {
    window.location.href = "/registrar";
  };

  const handleSingIn = (data) => {
    localStorage.setItem("logado", true);
  };
  return (
    <Container fluid className={styles.box}>
      <Row className={styles.bloco}>
        <Col md={6} sm={0} className={styles.col1}></Col>
        <Col md={6} sm={12} className={styles.col2}>
          <div className="d-contents">
            <h1>
              Olá,
              <br />
              Seja Bem-Vindo!
            </h1>
          </div>
          <form onSubmit={handleSubmit(handleSingIn)}>
            <label> E-mail: </label>
            <Form.Control
              type="email"
              id="email"
              placeholder="Insira seu e-mail"
              aria-describedby=""
              onChange={(e) => setEmail(e.target.value)}
              {...register("email")}
            />
            {errors?.email && (
              <p style={{ color: "red", marginTop: 2, textAlign: "left" }}>
                {" "}
                {errors.email.message}
              </p>
            )}

            <label> Senha:</label>
            <Form.Control
              {...register("senha")}
              type="password"
              id="senha"
              placeholder="Insira sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            {errors?.senha && (
              <p style={{ color: "red", marginTop: 2, textAlign: "left" }}>
                {" "}
                {errors.senha.message}
              </p>
            )}
            <Botao type="submit" texto="Entrar" />
          </form>
          <p>
            Ainda não tem uma conta?
            <a onClick={redirectRegister}>
              <span> Registra-se agora</span>
            </a>
            !
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
