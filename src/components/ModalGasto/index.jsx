import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { CheckCircleFill, X } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import InputMask from "react-input-mask";

const ModalGasto = ({ isOpen, onClose }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("");

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setDescricao("");
    setValor("");
    setData("");
    setCategoria("");
    if (onClose) {
      onClose();
    }
  };
  const handleReload = () => {
    window.location.reload();
  };

  const handleData = async (e) => {
    e.preventDefault();
    const valorNumber = parseFloat(valor) * -1;
    const formData = {
      descricao,
      valorNumber,
      data,
      categoria,
      tipo: "saida",
    };

    try {
      const response = await fetch(
        "https://664c02b535bbda10987eac04.mockapi.io/api/finances/valores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
      handleCloseModal();
      handleReload();
      handleCloseModal();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <Container>
      <div
        className={styles.modalContainer}
        style={{ display: modalOpen ? "block" : "none" }}
      >
        <div className={styles.modalContentM}>
          <div className="d-flex justify-content-end">
            <X className={styles.closeModal} onClick={handleCloseModal} />
          </div>
          <h1 className={styles.tituloModal}>Insira seus Gastos</h1>
          <Form onSubmit={handleData}>
            <Form.Group className="mb-3">
              <Form.Label>Descrição:</Form.Label>
              <Form.Control
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Insira uma descrição"
              />
            </Form.Group>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Valor:</Form.Label>
                  <Form.Control
                    type="text"
                    value={valor}
                    onChange={(e) => setValor(e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Data:</Form.Label>
                  <Form.Control
                    type="text"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                    as={InputMask}
                    mask="99/99/9999"
                    placeholder="DD/MM/AAAA"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Categoria:</Form.Label>
              <Form.Select
                aria-label="Selecione uma categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione uma categoria: </option>
                <option value="alimentacao">Alimentação</option>
                <option value="contas">Contas Fixas</option>
                <option value="moradia">Moradia</option>
                <option value="gastosExtras">Gastos Extras</option>
                <option value="outros">Outros</option>
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className={styles.buttonForm}>
                {" "}
                <CheckCircleFill />{" "}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ModalGasto;
