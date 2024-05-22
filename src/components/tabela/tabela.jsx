import * as React from "react";
import DataTable from "react-data-table-component";
import dataTabela from "./../../data/dataTabela.json";

import styles from "./tabela.module.css";

const tabela = () => {
 
  const data = dataTabela;
  const columns = [
    {
      name: "Descrição",
      selector: (row) => row.descricao,
      sortable: true,
      style: { color: "black", fontWeight: "bold" },
    },
    { name: "Métodos", selector: (row) => row.metodo, sortable: true },
    { name: "Data", selector: (row) => row.data, sortable: true },
    { name: "Valor", selector: (row) => row.valor, sortable: true },
  ];

  const customStyle = {
    cells: {
      style: {
        color: "grey",
        overflow: "hidden",
        whiteSpace: "wrap",
        textOverflow: "ellipses",
        display: "flex",
        JustifyContent: "center",
        fontSize: "13px",
      },
    },
    headCells: {
      style: {
        color: "#4285f4",
        fontWeight: "bold",
        fontSize: "14px",
        display: "flex",
        JustifyContent: "center",
       
      },
    },
  };
  const conditionalRowStyles = [
    {
      when: (row) => row.valor > 0,
      style: (row) => ({ color: row.valor ? "green" : "red" }),
    },
  ];

  return (
    <div className={styles.tabela}>
      <DataTable
        responsive={true}
        columns={columns}
        data={data}
        noDataComponent="Registro não encontrado"
        customStyles={customStyle}
        conditionalRowStyles={conditionalRowStyles}
      ></DataTable>
    </div>
  );
};

export default tabela;
