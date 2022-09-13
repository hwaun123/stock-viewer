import axios from "axios";
import { useState } from "react";
const Main = () => {
  const [stock, setStock] = useState();
  const params = {
    serviceKey:
      "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==",
    resultType: "json",
  };
  axios
    .get(
      "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
      { params }
    )
    .then((Response) => {
      //   console.log(Response.data);
      setStock(Response.data);
      //   console.log(stock);
    })
    .catch((Error) => {
      console.log(Error);
    });

  const [stockName, setStockName] = useState("");
  const [searchData, setSearchData] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const searchParams = {
      serviceKey:
        "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==",
      resultType: "json",
      itmsNm: { stockName },
    };
    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
        { searchParams }
      )
      .then((Response) => {
        //   console.log(Response.data);
        setSearchData(Response.data);
        console.log(searchData);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };
  if (!stock) {
    return <div>데이터를 가져올 수 없습니다</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={stockName}
          onChange={(event) => setStockName(event.target.value)}
        ></input>
        <button type="submit">검색</button>
      </form>
      <ul>
        {stock.response.body.items.item.map((prev) => {
          return <li>{prev.itmsNm}</li>;
        })}
      </ul>
    </>
  );
};

export default Main;
