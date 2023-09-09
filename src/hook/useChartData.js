import { useState, useEffect } from "react";

import convertTimestamp from "./convertTimestamp";

export function useChartData() {
  const [dbData, setDbData] = useState();

  const fetchDbData = async () => {
    try {
      fetch("http://localhost:3001/")
        .then((response) => response.json())
        .then((data) => {
          const length = data.length;

          let newData = {};
          for (let i = 4; i < length; i++) {
            newData["data" + i] = data[i];
          }

          setDbData(newData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error(error);
    }
  };

  const [data, setData] = useState({
    splineData: {
      series: [
        {
          name: "series1",
          data: [0, 0, 0, 0, 0, 0, 0],
        },
      ],
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        //type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
    pieData: {
      options: {
        series: [44, 55, 13, 33],
        labels: ["USDT", "XRP", "BTC", "BFC"],
      },
      plotOptions: {
        pie: {
          customScale: 0.8,
        },
      },
    },
    barData: {
      options: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, -40, 45, -50, 49, -60, 70, 91],
        },
      ],
    },
  });

  useEffect(() => {
    fetchDbData();
  }, []);

  useEffect(() => {
    if (dbData) {
      const balanceValues = Object.values(dbData).map((item) =>
        parseFloat(item.balance)
      );
      const eventTimes = Object.values(dbData).map((item) =>
        convertTimestamp(parseFloat(item.unix_timestamp))
      );

      const groupedByDate = Object.values(dbData).reduce((acc, item) => {
        const date = convertTimestamp(parseFloat(item.unix_timestamp)).split(
          "T"
        )[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(parseFloat(item.balance));
        return acc;
      }, {});

      const differences = Object.entries(groupedByDate).map(([, balances]) => {
        if (balances.length > 0) {
          return balances[balances.length - 1] - balances[0];
        }
        return 0;
      });

      setData((prev) => ({
        ...prev,
        splineData: {
          ...prev.splineData,
          series: [
            { ...prev.splineData.series[0], data: balanceValues },
            ...prev.splineData.series.slice(1),
          ],
          xaxis: {
            ...prev.splineData.xaxis,
            categories: eventTimes,
          },
        },
        barData: {
          ...prev.barData,
          series: [
            {
              ...prev.barData.series[0],
              data: differences,
            },
          ],
          options: {
            ...prev.barData.options,
            xaxis: {
              categories: Object.keys(groupedByDate),
            },
          },
        },
      }));
    }
    const intervalId = setInterval(fetchDbData, 10 * 60 * 1000);
    // 10분마다 fetchData를 실행
    // 1000 | 초 x 60 | 분 x 10 | 10분

    return () => {
      clearInterval(intervalId); // 컴포넌트가 언마운트될 때 인터벌 제거
    };
  }, [dbData]);

  return data;
}
