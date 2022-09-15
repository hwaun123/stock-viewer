import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Main.css";

const Main = () => {
  const SECRET_KEY =
    "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==";
  const [stock, setStock] = useState([]);

  const [stockName, setStockName] = useState("");

  useEffect(() => {
    if (!stockName) {
      setStock([]);
    }
  }, [stockName]);

  const [ifLoading, setIfLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setStock([]);
    const arrSrtnCd = [];

    setIfLoading(true);
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
        setIfLoading(false);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <main className="container">
      <header className="stock-header">
        <h1 className="stock-title">stockviewer</h1>
        <h2 className="stock-subTitle">궁금했던 주식정보, StockViewer에서</h2>
      </header>

      <form onSubmit={handleSubmit} className="stock-form">
        <input
          type="text"
          value={stockName}
          onChange={(event) => setStockName(event.target.value)}
          placeholder="관심주를 검색해 보세요"
        ></input>
        <button type="submit">검색</button>
      </form>
      {ifLoading ? (
        <div className="loading-box">로딩중입니다...</div>
      ) : (
        <ul className="stock-list">
          {stock.map((prev) => {
            return (
              <Link
                key={prev.srtnCd}
                to={`/stock/${prev.srtnCd}`}
                params={prev.srtnCd}
                className="stock-item"
              >
                <li>{prev.itmsNm}</li>
              </Link>
            );
          })}
        </ul>
      )}
    </main>
  );
};

export default Main;
