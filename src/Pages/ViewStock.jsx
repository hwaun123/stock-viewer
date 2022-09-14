import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
// 그래프 만들고 CSS
// ...[1,2,3] => 1,2,3
// [...[1,2,3]] => [1,2,3]
// [] === [] => false
// [1,2,3] === [1,2,3] => false
// arr = [1,2,3]
// [...arr] === arr =>

const ViewStock = () => {
  //   const [searchStockData] = useSearch();
  const [stockData, setStockData] = useState();
  const reversedStockData = [...stockData].reverse();
  const param = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const SECRET_KEY =
    "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==";
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
        {
          params: {
            serviceKey: SECRET_KEY,
            resultType: "json",
            likeSrtnCd: param.name,
          },
        }
      )
      .then((Response) => {
        setStockData(Response.data.response.body.items.item);
      })
      .catch((Error) => {
        console.log(Error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [param.name]);

  if (isLoading) return <div>데이터를 가져오고 있습니다.</div>;

  if (!isLoading && !stockData) {
    return <div>데이터를 가져올 수 없습니다</div>;
  }

  console.log(stockData);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: reversedStockData.map((m) => m.basDt),
    datasets: [
      {
        label: stockData[0].itmsNm,
        data: reversedStockData.map((m, index) => m.clpr),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {stockData.map((item) => (
        <>
          <li>{item.itmsNm}</li>
          <li>종목 코드 : {item.isinCd}</li>
          <li>{item.basDt}</li>
          <li>시장: {item.mrktCtg}</li>
          <li>
            {item.basDt}일자 시작가 {item.mkp}
          </li>
          <li>
            {item.basDt}일자 최고가 {item.hipr}
          </li>
          <li>
            {item.basDt}일자 최저가 {item.lopr}
          </li>
          <li>최종가 {item.clpr}</li>
          <li>
            전일 대비 등락 : {item.vs} 전일 대비 등락비 : {item.fltRt} :
          </li>
          <Line options={options} data={data} />
        </>
      ))}
    </>
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default ViewStock;
