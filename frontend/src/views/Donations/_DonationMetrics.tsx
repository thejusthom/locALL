import * as React from "react";
import styled from "styled-components";
import { IDonation } from "../../models/donation";
import PieChartComp, { IPieData } from "../Charts/_PieChart";
import BarChartstackedComp from "../Charts/_BarChart";
import RadarChartComp from "../Charts/_RadarChart";
import AreaChartComp from "../Charts/_AreaChart";
import CompositeChartComp from "../Charts/_CompositeChart";

interface IDonationMetrics{
donation: IDonation[];
}

const DonationMetrics = (props: IDonationMetrics) => {
//pie chart data initial
const data01: any = {
  "school": {
    "name": "School",
    "value": 0,
    "color": "#264478"
  },
 "university": {
    "name": "University",
    "value": 0,
    "color": "#4472c4"
  },
  "medical":{
    "name": "Medical",
    "value": 0,
    "color": "#12283d"
  },
  "shelter":{
    "name": "Shelter",
    "value": 0,
    "color": "#5ba3e7"
  },
  "other": {
    "name": "Other",
    "value": 0,
    "color": "#636363"
  }
};

//composite chart data inital
const data: any = {
  "school": {
    name: 'School',
    below50: 0,
    amountRequired: 0,
    amountAchieved: 0,
    above50: 0,
  },
  "university": {
    name: 'University',
    below50: 0,
    amountRequired: 0,
    amountAchieved: 0,
    above50: 0,
  },
  "medical": {
    name: 'Medical',
    below50: 0,
    amountRequired: 0,
    amountAchieved: 0,
    above50: 0,
  },
  "shelter": {
    name: 'Shelter',
    below50: 0,
    amountRequired: 0,
    amountAchieved: 0,
    above50: 0,
  },
  "other": {
    name: 'Other',
    below50: 0,
    amountRequired: 0,
    amountAchieved: 0,
    above50: 0,
  },
};
//donations
  const donations = [...props.donation];
  //pie chart data after data manipulation
  donations?.forEach((d) => data01[d.category].value += 1);
  const pieChartData: IPieData[] = Object.values(data01);

   //composite chart data after data manipulation
donations?.forEach((d) => {
  //amountRequired
  data[d.category].amountRequired += d.amountRequired;
  //amountAchieved
  if(!!d.amountAchieved){
    data[d.category].amountAchieved += d.amountAchieved;
  }
  // below 50 and above 50 data
 data[d.category][ d.receiver.age < 50 ? "below50" : "above50"] += d.amountRequired
});
const compositeChartData = Object.values(data);

    return(
        <MetricsWrap>
          {/* pie chart comp */}
          <DivWrap>
          <ChartWrap>
          <InnerWrap>
      <PieChartComp pieChartData={pieChartData} dataKey="value" nameKey="name" />
      </InnerWrap>
      </ChartWrap>
      {/* bar chart comp */}
      <ChartWrap>
        <InnerWrap>
        <BarChartstackedComp barChartData={compositeChartData} bar1Key="amountRequired" bar2Key="amountAchieved" yAxisKey="name" layout="vertical" />
        </InnerWrap>
        </ChartWrap>
        </DivWrap>
        <DivWrap>
          {/* radar chart comp */}
          <ChartWrap>
          <InnerWrap>
<RadarChartComp radarChartData={compositeChartData} dataKey="name" radar1Name="Below 50" radar1Key="below50" radar2Name="Above 50" radar2Key="above50" />
</InnerWrap>
        </ChartWrap>
        {/* area chart comp */}
        <ChartWrap>
          <InnerWrap>
<AreaChartComp areaChartData={compositeChartData} dataKey="name" area1Key="amountRequired" area2Key="amountAchieved" />
</InnerWrap>
        </ChartWrap>
        </DivWrap>
        {/* composite chart comp */}
        <DivWrap>
          <ChartWrap style={{width: "100%"}}>
          <InnerWrap>
        <CompositeChartComp compositeChartData={compositeChartData} dataKey="name" areaKey="amountAchieved" barKey="amountRequired" line1Key="below50" line2Key="above50" />
        </InnerWrap>
        </ChartWrap>
        </DivWrap>
      </MetricsWrap>
    );
};

//styling
const MetricsWrap = styled.article`
.tooltip-wrap{
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    p{
      align-items: center;
    }
}
`;
const ChartWrap = styled.section`
width: 700px;
display: flex;
border-radius: 5px;
    align-items: center;
    border: solid 1px lightgrey;
    box-shadow: 0px 0px 10px 1px #b4b1b1;
`;
const DivWrap = styled.div`
display: flex;
justify-content: space-between;
margin-top: 40px;
`;
const InnerWrap = styled.div`
width: 100%;
text-align: -webkit-center;
`;

export default DonationMetrics;