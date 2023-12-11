import * as React from "react";
import styled from "styled-components";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    BarChart,
    AreaChart,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    CartesianGrid,
    Legend,
    // Scatter,
    // ResponsiveContainer,  
} from "recharts";
import { IDonation } from "../../models/donation";
import PieChartComp, { IPieData } from "../Charts/_PieChart";
import BarChartstackedComp from "../Charts/_BarChart";

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

//   const data02 = [
//     {
//       "name": "Group A",
//       "value": 2400
//     },
//     {
//       "name": "Group B",
//       "value": 4567
//     },
//     {
//       "name": "Group C",
//       "value": 1398
//     },
//     {
//       "name": "Group D",
//       "value": 9800
//     },
//     {
//       "name": "Group E",
//       "value": 3908
//     },
//     {
//       "name": "Group F",
//       "value": 4800
//     }
//   ];

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
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
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
        {/* <PieChart width={730} height={400}>
            <Tooltip />
            <text x={365} y={200} textAnchor="middle" dominantBaseline="middle">
    Categories
   </text>
        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75}  label={renderCustomizedLabel} outerRadius={150} fill="#8884d8" labelLine={false}>
        {
          	pieChartData?.map((entry: any, index: number) => <Cell fill={entry.color}/>)
          }
            </Pie>
      </PieChart> */}
      <PieChartComp pieChartData={pieChartData} dataKey="value" nameKey="name" />

      {/* <BarChart
          width={500}
          height={300}
          data={compositeChartData}
          layout="vertical"
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >

          {/* <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="amountRequired" stackId="a" fill="#123abc" />
          <Bar dataKey="amountAchieved" stackId="a" fill="#82ca9d" />
        </BarChart> */}

        <BarChartstackedComp barChartData={compositeChartData} bar1Key="amountRequired" bar2Key="amountAchieved" yAxisKey="name" layout="vertical" />

        <RadarChart outerRadius={90} width={730} height={250} data={compositeChartData}>
  <PolarGrid />
  <PolarAngleAxis dataKey="name" />
  <PolarRadiusAxis angle={30} />
  <Tooltip />
  <Radar name="Below 50" dataKey="below50" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  <Radar name="Above 50" dataKey="above50" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
  <Legend />
</RadarChart>

      <AreaChart
          width={500}
          height={400}
          data={compositeChartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="amountRequired" stackId="1" stroke="#8884d8" fill="#123abc" />
          <Area type="monotone" dataKey="amountAchieved" stackId="1" stroke="#82ca9d" fill="#8cd1b9" />
          {/* <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" /> */}
        </AreaChart>

      {/* <ResponsiveContainer width="100%" height="100%"> */}
       <ComposedChart
          width={1000}
          height={500}
          data={compositeChartData}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          {/* <CartesianGrid stroke="#f5f5f5" /> */}
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area type="monotone" dataKey="amountAchieved" fill="#9fbddd" stroke="#1976d2" />
          <Bar dataKey="amountRequired" barSize={20} fill="#123abc" />
          <Line type="monotone" dataKey="below50" stroke="#38d200" />
          <Line type="monotone" dataKey="above50" stroke="violet" />
           {/* <Scatter dataKey="above50" fill="red" /> */}
        </ComposedChart> 
      {/* </ResponsiveContainer> */}
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