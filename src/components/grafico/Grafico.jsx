import styles from "./grafico.module.css";

import { Chart } from "react-google-charts";

export const options = {
  title: "Despesas por Categorias",
  pieHole: 0.4,
  is3D: false,
  colors: ["#4285F4", "#FBBC05", "#34A853", "#EA4335", "#9C27B0"],
  fontSize: 16,
  backgroundColor: " #fefdf9",
  boxShadow: "0 14px 21px 0 rgba(0, 0, 0, 0.06)",
  border: "1px solid #fefdf9",
  borderRadius: "10px",

  legend: {
    position: "bottom",
    maxLines: 3,
    textStyle: {
      color: "blue",
      fontSize: 14,
    },
  },
  titleTextStyle: {
    color: "#606060",
    fontName: "Roboto",
    fontSize: 18,
  },
  chartArea: {
    width: "80%",
    height: "75%",
    backgroundColor: {
      fill: "transparent",
    },
  },
};
const Grafico = ({ cf, moradia, ge, alimentacao, outros }) => {
  const data = [
    ["Fonte do Gasto", "Valor do Gasto"],
    ["Contas Fixas", cf],
    ["Moradia", moradia],
    ["Gastos Extras", ge],
    ["Alimentação", alimentacao],
    ["Outros", outros],
  ];

  return (
    <div className={styles.grafico}>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default Grafico;
