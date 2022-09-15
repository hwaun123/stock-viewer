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
import "./ViewStock.css";
import Loading from "./Loading";
const ViewStock = () => {
  const [stockData, setStockData] = useState();
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

  if (isLoading) return <Loading />;

  if (!isLoading && !stockData) {
    return <div>데이터를 가져올 수 없습니다</div>;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  // const options = ;

  const reversedStockData = [...stockData].reverse();

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
  const firstData = stockData[0];
  return (
    <div className="view-container">
      <div className="view-cards">
        <div className="view-info card">
          <h1 className="view-title">{firstData.itmsNm}</h1>
          <div className="view-subTitle">
            <h2>기준일자 : {firstData.basDt}</h2>
            <h2>샹쟝 주식주 : {firstData.lstgStCnt}주</h2>
          </div>
        </div>
        <div className="card">
          <div className="card-item">
            <div className="card-item-title">시장 분류</div>
            <div className="card-item-data">{firstData.mrktCtg}</div>
          </div>
          <div className="card-item">
            <div className="card-item-title">종목 코드</div>{" "}
            <div className="card-item-data">{firstData.isinCd}</div>
          </div>
        </div>
        <div className="card">
          <div className="card-item">
            <div className="card-item-title">시작가</div>{" "}
            <div className="card-item-data">{firstData.mkp}원</div>
          </div>
          <div className="card-item">
            <div className="card-item-title">최종가</div>{" "}
            <div className="card-item-data">{firstData.clpr}원</div>
          </div>
          <div className="card-item">
            <div className="card-item-title">최고가</div>{" "}
            <div className="card-item-data">{firstData.hipr}원</div>
          </div>
          <div className="card-item">
            <div className="card-item-title">최저가</div>{" "}
            <div className="card-item-data">{firstData.lopr}원</div>
          </div>
        </div>
      </div>
      <div className="view-grape">
        <Line
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "최근 10일간 동향",
              },
            },
            layout: {
              padding: {
                top: 50,
                left: 100,
                right: 100,
                bottom: 50,
              },
            },
          }}
          data={data}
        />
      </div>
    </div>
  );
};

export default ViewStock;
