import Container from "react-bootstrap/Container";
import Navegador from "../../components/Navegador/Navegador";
import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { DashCircle } from "react-bootstrap-icons";
import { PlusCircle } from "react-bootstrap-icons";
import { Clipboard2Data } from "react-bootstrap-icons";
import Grafico from "../../components/grafico/Grafico";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tabela from "./../../components/tabela/tabela";
import ModalGanho from "../../components/ModalGanho/index";
import ModalGasto from "../../components/ModalGasto";
const Dashboard = () => {
  const [modalOpenGanho, setModalOpenGanho] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dados, setDados] = useState([]);
  const handleOpenModalGanho = () => {
    setModalOpenGanho(true);
  };

  const handleCloseModalGanho = () => {
    setModalOpenGanho(false);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const today = new Date();
 
  let cumprimento = "Olá";

  if (today.getHours() <= 11) {
    cumprimento = "Bom Dia";
  } else if (today.getHours() > 11) {
    cumprimento = "Boa Tarde";
  } else if (today.getHours() >= 18) {
    cumprimento = "Boa Noite";
  }

  const handleRelatorio = () => {
    window.location.href = "/relatorio";
  };

  const dadosValores = async () => {
    try {
      const response = await fetch(
        "https://664c02b535bbda10987eac04.mockapi.io/api/finances/valores",
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao enviar os dados");
      }

      const result = await response.json();
      console.log("Dados enviados com sucesso:", result);
      setDados(result);
      return { result };
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    dadosValores();
  }, []);
  const saldoDados = dados.map((dados) => {
    return dados.valorNumber;
  });

  const ganhosFilter = dados
    .filter((dados) => dados.tipo === "entrada")
    .map((dados) => {
      return dados.valorNumber;
    });
  const gastosFilter = dados
    .filter((dados) => dados.tipo === "saida")
    .map((dados) => {
      return dados.valorNumber;
    });
  const nome = "Danielly";
  const saldo = saldoDados.reduce((ac, valor) => ac + valor, 0);
  const ganho = ganhosFilter.reduce((ac, valor) => ac + valor, 0);
  const gasto = gastosFilter.reduce((ac, valor) => ac + valor, 0);
  const saldoExibicao = "R$" + " " + saldo;
  const ganhoExibicao = "R$" + ganho;
  const gastoExibicao = "R$" + gasto;
  const categoriaCF =
    dados
      .filter((dados) => dados.categoria === "contas")
      .map((dados) => {
        return dados.valorNumber;
      })
      .reduce((ac, valor) => ac + valor, 0) * -1;
  const categoriaAlimentacao =
    dados
      .filter((dados) => dados.categoria === "alimentacao")
      .map((dados) => {
        return dados.valorNumber;
      })
      .reduce((ac, valor) => ac + valor, 0) * -1;
  const categoriaMoradia =
    dados
      .filter((dados) => dados.categoria === "moradia")
      .map((dados) => {
        return dados.valorNumber;
      })
      .reduce((ac, valor) => ac + valor, 0) * -1;
  const categoriaGastosExtras =
    dados
      .filter((dados) => dados.categoria === "gastosExtras")
      .map((dados) => {
        return dados.valorNumber;
      })
      .reduce((ac, valor) => ac + valor, 0) * -1;
  const categoriaOutros =
    dados
      .filter((dados) => dados.categoria === "outros")
      .map((dados) => {
        return dados.valorNumber;
      })
      .reduce((ac, valor) => ac + valor, 0) * -1;

  return (
    <>
      <Navegador />
      <Container flex className={styles.dashboard}>
        <div className={styles.sessao1}>
          <div className={styles.nome}>
            <h1>
              {cumprimento}, {nome}!{" "}
            </h1>
          </div>
          <div className={styles.sessao3}>
            <div className={styles.mais} onClick={handleOpenModalGanho}>
              <p className={styles.textoMais}>
                <span className={styles.iconMais}>
                  {" "}
                  <PlusCircle />{" "}
                </span>{" "}
                Insira Ganho
              </p>
            </div>
            <ModalGanho
              isOpen={modalOpenGanho}
              size="small"
              onClose={handleCloseModalGanho}
            />

            <div className={styles.menos} onClick={handleOpenModal}>
              <p className={styles.textoMenos}>
                <span className={styles.iconMenos}>
                  {" "}
                  <DashCircle />{" "}
                </span>
                Insira Gastos
              </p>
            </div>
            <ModalGasto
              isOpen={modalOpen}
              size="small"
              onClose={handleCloseModal}
            />
            <div className={styles.relatorio} onClick={handleRelatorio}>
              <p className={styles.textoRelatorio}>
                <span className={styles.iconRelatorio}>
                  <Clipboard2Data />
                </span>
                Relatório
              </p>
            </div>
          </div>
        </div>
        <div className={styles.sessao2}>
          <div className={styles.saldo}>
            <small> Saldo</small>
            <p> {saldoExibicao}</p>
          </div>
          <div className={styles.ganho}>
            <small> Ganhos</small>
            <p> {ganhoExibicao}</p>
          </div>
          <div className={styles.gasto}>
            <small> Despesas</small>
            <p> {gastoExibicao}</p>
          </div>
        </div>

        <div className={styles.sessao4}>
          <Container>
            <Row>
              <Col md={6} sm={12} className={styles.graficoCol}>
                <Grafico
                  cf={categoriaCF}
                  moradia={categoriaMoradia}
                  ge={categoriaGastosExtras}
                  alimentacao={categoriaAlimentacao}
                  outros={categoriaOutros}
                />
              </Col>
              <Col
                md={6}
                sm={12}
                styles='margin-top:"17px"'
                className={styles.barrasCol}
              >
                <h1> Ultimas transações</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
