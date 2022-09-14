import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearch } from "./Contexts/SearchStockContext";

const ViewStock = () => {
  //   const [searchStockData] = useSearch();
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

  if (isLoading) return <div>데이터를 가져오고 있습니다.</div>;

  if (!isLoading && !stockData) {
    return <div>데이터를 가져올 수 없습니다</div>;
  }

  console.log(stockData);
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
          <li>
            전일 대비 등락 : {item.vs} 전일 대비 등락비 : {item.fltRt}
          </li>
        </>
      ))}
    </>
  );
};

export default ViewStock;
