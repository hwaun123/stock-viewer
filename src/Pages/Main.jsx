import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Main = () => {
  const SECRET_KEY =
    "h9vAi2Omf6fvC4lihNNGxwYyXMTz1ExFFB90tmR0nYCYJeRyRdmq67aNQaA3UmWbYPJT/R89604QOpPUfb6LPg==";
  const [stock, setStock] = useState();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
        {
          params: {
            serviceKey: SECRET_KEY,
            resultType: "json",
          },
        }
      )
      .then((Response) => {
        setStock(Response.data.response.body.items.item);
      })
      .catch((Error) => {
        console.log(Error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const [stockName, setStockName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        "https://apis.data.go.kr/1160100/service/GetStockSecuritiesInfoService/getStockPriceInfo",
        {
          params: {
            serviceKey: SECRET_KEY,
            resultType: "json",
            itmsNm: stockName,
          },
        }
      )
      .then((Response) => {
        navigate(`/stock/${Response.data.response.body.items.item[0].srtnCd}`);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  if (isLoading) return <div>데이터를 가져오고 있습니다.</div>;

  if (!isLoading && !stock) {
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
        {stock.map((prev) => {
          return (
            <>
              <Link to={`/stock/${prev.srtnCd}`} params={prev.srtnCd}>
                <li>{prev.itmsNm}</li>
              </Link>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Main;
