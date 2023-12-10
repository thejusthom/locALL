import * as React from "react";
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
    Scatter,
    ResponsiveContainer,  
} from "recharts";

const data01 = [
    {
      "name": "School",
      "value": 20,
      "color": "#264478"
    },
    {
      "name": "University",
      "value": 10,
      "color": "#4472c4"
    },
    {
      "name": "Medical",
      "value": 18,
      "color": "#12283d"
    },
    {
      "name": "Shelter",
      "value": 5,
      "color": "#5ba3e7"
    },
    {
      "name": "Other",
      "value": 9,
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

const DonationMetrics = () => {
    const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return(
        <>
        <PieChart width={730} height={400}>
            <Tooltip />
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75}  label={renderCustomizedLabel} outerRadius={150} fill="#8884d8">
        {
          	data01.map((entry, index) => <Cell fill={data01[index].color}/>)
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
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="amountAchieved" fill="#9fbddd" stroke="#1976d2" />
          <Bar dataKey="amountRequired" barSize={20} fill="#123abc" />
          <Line type="monotone" dataKey="below50" stroke="#38d200" />
          <Line type="monotone" dataKey="above50" stroke="violet" />
          {/* <Scatter dataKey="above50" fill="red" /> */}
        </ComposedChart>
      {/* </ResponsiveContainer> */}
      </>
    );
};

export default DonationMetrics;