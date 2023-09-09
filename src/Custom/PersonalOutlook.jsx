import ChartWrapper from "./ChartWrapper";
import { FlexBox, Word } from "./customComponents";
import Chart from "react-apexcharts";

function PersonalOutlook({ options, name }) {
  return (
    <FlexBox
      row
      style={{
        alignSelf: "center",
        justifyContent: "space-around",
        marginTop: "1%",
        width: "100%",
        //backgroundColor: "red",
      }}
    >
      <ChartWrapper>
        <Chart
          options={options.splineData}
          series={options.splineData.series}
          type="line"
          width="500"
        />
      </ChartWrapper>
      <ChartWrapper>
        <Chart
          options={options.splineData}
          series={options.splineData.series}
          type="line"
          width="500"
        />
      </ChartWrapper>

      <ChartWrapper>
        <Chart
          options={options.barData.options}
          series={options.barData.series}
          type="bar"
          width="500"
        />
      </ChartWrapper>

      <ChartWrapper>
        <Chart
          options={options.pieData.options}
          series={options.pieData.options.series}
          type="pie"
          width="500"
        />
      </ChartWrapper>
    </FlexBox>
  );
}

export default PersonalOutlook;
