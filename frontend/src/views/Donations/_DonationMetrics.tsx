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

const data02: any = [
{
    "name": "School",
    "value": 0,
    "color": "#264478"
  },
{
    "name": "University",
    "value": 0,
    "color": "#4472c4"
  },
 {
    "name": "Medical",
    "value": 0,
    "color": "#12283d"
  },
{
    "name": "Shelter",
    "value": 0,
    "color": "#5ba3e7"
  },
 {
    "name": "Other",
    "value": 0,
    "color": "#636363"
  }
];

const DonationMetrics = (props: IDonationMetrics) => {
  
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

  const donations = [...props.donation];
  donations?.forEach((d) => data01[d.category].value += 1);
  const pieChartData: IPieData[] = Object.values(data01);
donations?.forEach((d) => {
  data[d.category].amountRequired += d.amountRequired;
  if(!!d.amountAchieved){
    data[d.category].amountAchieved += d.amountAchieved;
  }
 data[d.category][ d.receiver.age < 50 ? "below50" : "above50"] += d.amountRequired
});
const compositeChartData = Object.values(data);
console.log(donations)
console.log(data);
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    console.log(payload, label)
    if (active && payload && payload.length) {
        const Circle = (props: {fill: string}) => {
return(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15" width="15" height="15">
<circle cx="7.5" cy="7.5" r="3" fill={props.fill} />
</svg>);
        }
      return (
        <div className="tooltip-wrap">
          <p className="label">{label}</p>
          <p><span><Circle fill="#123abc" /></span>Amount Required: {payload[0].payload.amountRequired}</p>
          <p><span><Circle fill="#1976d2" /></span>Amount Achieved: {payload[0].payload.amountAchieved}</p>
          <p><span><Circle fill="#38d200" /></span>Below 50 Age: {payload[0].payload.below50}</p>
          <p><span><Circle fill="violet" /></span>Above 50 Age: {payload[0].payload.above50}</p>
        </div>
      );
    }
    else return null;
}

    return(
        <MetricsWrap>
      <PieChartComp pieChartData={pieChartData} dataKey="value" nameKey="name" />
        <BarChartstackedComp barChartData={compositeChartData} bar1Key="amountRequired" bar2Key="amountAchieved" yAxisKey="name" layout="vertical" />
<RadarChartComp radarChartData={compositeChartData} dataKey="name" radar1Name="Below 50" radar1Key="below50" radar2Name="Above 50" radar2Key="above50" />
<AreaChartComp areaChartData={compositeChartData} dataKey="name" area1Key="amountRequired" area2Key="amountAchieved" />
        <CompositeChartComp compositeChartData={compositeChartData} dataKey="name" areaKey="amountAchieved" barKey="AmountRequired" line1Key="below50" line2Key="above50" />
      </MetricsWrap>
    );
};

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

export default DonationMetrics;