import * as React from "react";
import {    
    Bar,
    XAxis,
    YAxis,
    BarChart,
    Tooltip,
    Legend
} from "recharts";

interface IBarChartProps{
barChartData: any[];
yAxisKey: string;
bar1Key: string;
bar2Key: string;
layout: 'horizontal' | 'vertical';
}

const BarChartstackedComp = (props: IBarChartProps) => {
    const { bar1Key, bar2Key, barChartData, yAxisKey, layout } = props;
    return(
        <BarChart
        width={500}
        height={300}
        data={barChartData}
        layout={layout}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey={yAxisKey} />
        <Tooltip />
        <Legend />
        <Bar dataKey={bar1Key} stackId="a" fill="#123abc" />
        <Bar dataKey={bar2Key} stackId="a" fill="#82ca9d" />
      </BarChart>
    );
};

export default BarChartstackedComp;