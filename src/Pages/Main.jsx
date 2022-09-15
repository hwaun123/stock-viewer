import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const SECRET_KEY =
    "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==";
  const [stock, setStock] = useState([]);

  const [stockName, setStockName] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setStock([]);
    const arrSrtnCd = [];

    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
        {
          params: {
            serviceKey: SECRET_KEY,
            resultType: "json",
            likeItmsNm: stockName,
            numOfRows: 30,
          },
        }
      )
      .then((Response) => {
        Response.data.response.body.items.item.forEach((item) => {
          if (!arrSrtnCd.includes(item.srtnCd)) {
            arrSrtnCd.push(item.srtnCd);
            setStock((prev) => [...prev, item]);
          }
        });
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  // useEffect(() => {
  //   const arrSrtnCd = [];
  //   setIsLoading(true);

  //   axios
  //     .get(
  //       "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
  //       {
  //         params: {
  //           serviceKey: SECRET_KEY,
  //           resultType: "json",
  //           likeItmsNm: "삼성",
  //           numOfRows: 30,
  //         },
  //       }
  //     )
  //     .then((Response) => {
  //       console.log("Run");
  //       Response.data.response.body.items.item.forEach((item) => {
  //         if (!arrSrtnCd.includes(item.srtnCd)) {
  //           arrSrtnCd.push(item.srtnCd);
  //           setStock((prev) => [...prev, item]);
  //         }
  //       });
  //     })
  //     .catch((Error) => {
  //       console.log(Error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) return <div>데이터를 가져오고 있습니다.</div>;

  // if (!isLoading && !stock) {
  //   return <div>데이터를 가져올 수 없습니다</div>;
  // }
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="stock-form">
        <input
          type="text"
          value={stockName}
          onChange={(event) => setStockName(event.target.value)}
        ></input>
        <button type="submit">검색</button>
      </form>
      <ul className="stock-list">
        {stock.map((prev) => {
          return (
            <>
              <Link
                to={`/stock/${prev.srtnCd}`}
                params={prev.srtnCd}
                className="stock-item"
              >
                <li>{prev.itmsNm}</li>
              </Link>
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Main;
