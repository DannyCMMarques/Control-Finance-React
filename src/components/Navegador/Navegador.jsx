import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Navegador.module.css";
import menuContents from "../../Contents/menuContents";
import { BoxArrowRight } from "react-bootstrap-icons";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
const Navegador = () => {
  const location = useLocation();
  const [categoriaAtiva, setCategoriaAtiva] = useState(1);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const rotaAtual = menuContents.find(
      (item) => item.href === location.pathname
    );

    if (rotaAtual) {
      setCategoriaAtiva(rotaAtual.id);
    }
  }, [location.pathname]);

  const handleSelect = () => {
    setExpanded(false);
  };

  const tooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Log Out
    </Tooltip>
  );

  return (
    <>
      <Navbar
        collapseOnSelect
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        expand="lg"
        className={styles.menu}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/dashboard" className={styles.brand}>
            <img
              src="./../../../public/imagens/logo.png"
              className={styles.logo}
            />
            <span className={styles.titulo}> Control Finances </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className={styles.items}>
              {menuContents.map((items) => (
                <Nav.Link
                  key={items.id}
                  className={
                    categoriaAtiva === items.id ? styles.ativos : styles.li
                  }
                  href={items.href}
                  onClick={handleSelect}
                >
                  {items.titulo}
                </Nav.Link>
              ))}
              <Nav.Link>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={tooltip}
                >
                  <BoxArrowRight className={styles.icon} />
                </OverlayTrigger>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navegador;
