import * as React from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    Label
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
        <Pie data={[]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label>
            <Label>Categories</Label>
            </Pie>
      </PieChart>
      </>
    );
};

export default DonationMetrics;