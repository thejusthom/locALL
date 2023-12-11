import * as React from "react";
import styled from "styled-components";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell 
} from "recharts";

interface IPieData{
name: string;
value: number;
color: string;
}

interface IPieChartComp{
    pieChartData: IPieData[];
    dataKey: string;
    nameKey: string;
}

const PieChartComp = () => {
    return(
        <PieChart width={730} height={400}>
        <Tooltip />
        <text x={365} y={200} textAnchor="middle" dominantBaseline="middle">
Categories
</text>
    <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={75}  label={renderCustomizedLabel} outerRadius={150} fill="#8884d8" labelLine={false}>
    {
          pieChartData?.map((entry: any, index: number) => <Cell fill={entry.color}/>)
      }
        </Pie>
  </PieChart>
    );
};

export default PieChartComp;