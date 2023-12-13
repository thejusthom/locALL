import * as React from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    Cell 
} from "recharts";

// pie chart data
export interface IPieData{
name: string;
value: number;
color: string;
}

// pie chart props
interface IPieChartComp{
    pieChartData: IPieData[];
    dataKey: string;
    nameKey: string;
}

//pie chart common component
const PieChartComp = (props: IPieChartComp) => {
    const { pieChartData, dataKey, nameKey } = props;
    const RADIAN = Math.PI / 180;
    //custom label to display the percentage
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
    return(
        <PieChart width={730} height={400}>
        <Tooltip />
        {/* text inside the pie chart */}
        <text x={365} y={200} textAnchor="middle" dominantBaseline="middle">
Categories
</text>
    <Pie data={pieChartData} dataKey={dataKey} nameKey={nameKey} cx="50%" cy="50%" innerRadius={75}  label={renderCustomizedLabel} outerRadius={150} fill="#8884d8" labelLine={false}>
    {
          pieChartData?.map((entry: any, index: number) => <Cell fill={entry.color}/>)
      }
        </Pie>
  </PieChart>
    );
};

export default PieChartComp;