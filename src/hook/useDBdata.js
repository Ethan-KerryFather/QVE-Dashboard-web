import { useEffect, useState } from "react";

const useDBdata = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      fetch("http://localhost:3001/")
        .then((response) => response.json())
        .then((data) => {
          const length = data.length;

          setData({
            data1: data[length - 1],
            data2: data[length - 7],
            data3: data[length - 13],
            data4: data[length - 19],
            data5: data[length - 25],
            data6: data[length - 31],
          });
        })
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // 맨 처음에 한번 실행
    const intervalId = setInterval(fetchData, 10 * 60 * 1000);
    // 10분마다 fetchData를 실행
    // 1000 | 초 x 60 | 분 x 10 | 10분

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    };
  }, []);

  return data;
};

export default useDBdata;
