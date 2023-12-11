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
    // CartesianGrid,
    Legend,
    // Scatter,
    // ResponsiveContainer,  
} from "recharts";
import { IDonation } from "../../models/donation";

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

  const data = [
    {
      name: 'Page A',
      below50: 590,
      amountRequired: 800,
      amountAchieved: 1400,
      above50: 490,
    },
    {
      name: 'Page B',
      below50: 868,
      amountRequired: 967,
      amountAchieved: 1506,
      above50: 590,
    },
    {
      name: 'Page C',
      below50: 1397,
      amountRequired: 1098,
      amountAchieved: 989,
      above50: 350,
    },
    {
      name: 'Page D',
      below50: 1480,
      amountRequired: 1200,
      amountAchieved: 1228,
      above50: 480,
    },
    {
      name: 'Page E',
      below50: 1520,
      amountRequired: 1108,
      amountAchieved: 1100,
      above50: 460,
    },
    {
      name: 'Page F',
      below50: 1400,
      amountRequired: 680,
      amountAchieved: 1700,
      above50: 380,
    },
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


  // props.donation.forEach(donation => {
  //   const category = donation.category;
  //   if (data01.hasOwnProperty(category)) {
  //     data01[category].value += 1;
  //   }
  // });
  //   console.log(data01);
  // const metricsData = data01.map((i))
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
        <PieChart width={730} height={400}>
            <Tooltip />
            
        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75}  label={renderCustomizedLabel} outerRadius={150} fill="#8884d8">
        {
          	pieChartData?.map((entry: any, index: number) => <Cell fill={entry.color}/>)
          }
            </Pie>
        {/* <Pie data={[]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
      </PieChart>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
        <ComposedChart
          width={700}
          height={500}
          data={data}
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