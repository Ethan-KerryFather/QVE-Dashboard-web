import { Chip, Tooltip } from "@mui/material";
import { FlexBox, PContainer, Word } from "./customComponents";
import HelpIcon from "@mui/icons-material/Help";

const InfoBox = ({ title, rate }) => {
  return (
    <FlexBox>
      <FlexBox row style={{ alignItems: "center" }}>
        <Word size2>{title}&nbsp;</Word>
        <Tooltip
          title={
            title === "todayPNL"
              ? "today's profit and loss"
              : title === "monthPNL"
              ? "month's profit and loss"
              : title === "Balance"
              ? "Your Balance"
              : ""
          }
        >
          <HelpIcon fontSize="10px" />
        </Tooltip>
      </FlexBox>

      <FlexBox row style={{ alignItems: "center" }}>
        {title === "todayPNL" ? (
          <Word size3>{rate.toLocaleString()}$&nbsp;&nbsp;</Word>
        ) : title === "monthPNL" ? (
          <Word size3>
            {rate > 0 ? "+" : "-"} {rate.toLocaleString()}%&nbsp;&nbsp;
          </Word>
        ) : (
          <Word size3>{rate} USDT&nbsp;&nbsp;</Word>
        )}
        <Chip label={`+0.02%`} color="primary" />
      </FlexBox>
    </FlexBox>
  );
};

function DashHeader({ data }) {
  return (
    <PContainer style={{ width: "80%", alignSelf: "center" }}>
      <FlexBox
        row
        style={{
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <InfoBox
          title={Object.keys(data)[0]}
          rate={data[Object.keys(data)[0]]}
        />
        <div style={{ borderRight: "1px solid gray" }} />
        <InfoBox
          title={Object.keys(data)[1]}
          rate={data[Object.keys(data)[1]]}
        />
        <div style={{ borderRight: "1px solid gray" }} />
        <InfoBox
          title={Object.keys(data)[2]}
          rate={data[Object.keys(data)[2]]}
        />
      </FlexBox>
    </PContainer>
  );
}

export default DashHeader;
