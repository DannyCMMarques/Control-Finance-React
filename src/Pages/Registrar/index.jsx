import styles from "./styles.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Botao from "../../components/buttons/Botao";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Registrar = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [email, setEmail] = useState("");

  const validationSchemaLogin = z.object({
    email: z.string().email({ message: "E-mail obrigatório" }),
    senha: z
      .string()
      .min(1, { message: "Senha obrigatória" })
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    nome: z
      .string()
      .min(1, { message: "Nome obrigatório" })
      .min(3, { message: "Insira seu Nome Completo" }),
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
      nome: "",
    },
  });

  const handleSingIn = (data) => {
    localStorage.setItem("logado", true);
  };
  return (
    <Container fluid className={styles.box}>
      <Row className={styles.bloco}>
        <Col md={6} lg={6} className={styles.col2}>
          <form onSubmit={handleSubmit(handleSingIn)}>
            <h1> Registra-se agora: </h1>
            <label> Nome Completo: </label>
            <Form.Control
              type="text"
              id="nome"
              placeholder="Insira seu nome completo"
              aria-describedby=""
              onChange={(e) => setNome(e.target.value)}
              {...register("nome")}
            />
            {errors?.nome && (
              <p style={{ color: "red", marginTop: 2, textAlign: "left" }}>
                {" "}
                {errors.nome.message}
              </p>
            )}
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
            <Botao type="submit" texto="Cadastra-se" />
          </form>
        </Col>
        <Col md={6} lg={6} className={`${styles.col1}`}></Col>
      </Row>
    </Container>
  );
};

export default Registrar;
