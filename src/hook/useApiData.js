import axios from "axios";
import { useState, useEffect } from "react";
import * as Cheerio from "cheerio";

export function useApiData() {
  const [data, setData] = useState({
    todayPNL: 0,
    monthPNL: 0,
    Balance: 0,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://c2248r55db.execute-api.ap-northeast-1.amazonaws.com/default/getApolloxBWL"
      );

      const html = response.data;
      const $ = Cheerio.load(html);

      const textData = $("body p").text().split("\n");
      let todayPNL, Balance, monthPNL;

      textData.forEach((line) => {
        if (line.includes("24hr Profit")) {
          todayPNL = parseFloat(line.split(":")[1].trim().slice(0, -1));
        } else if (line.includes("Current Balance")) {
          Balance = line.split(":")[1].split("USDT")[0].trim(); // "USDT" 전까지의 문자열만 가져옴
        } else if (line.includes("Total Return")) {
          monthPNL = parseFloat(line.split(":")[1].trim().slice(0, -1));
        }
      });

      setData({
        ...data,
        todayPNL: todayPNL,
        monthPNL: monthPNL,
        Balance: Balance,
      });
      console.log(JSON.stringify(data));
    } catch (error) {
      if (error.response) {
        // 요청이 만들어졌고 서버도 응답했지만,
        // 응답의 상태 코드가 2xx 범위를 벗어난 경우
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
        console.log("Error", error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 10 * 60 * 1000);
    // 10분마다 fetchData를 실행
    // 1000 | 초 x 60 | 분 x 10 | 10분

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    };
  }, []);

  return data;
}
