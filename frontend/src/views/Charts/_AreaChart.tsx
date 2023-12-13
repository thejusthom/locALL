import * as React from "react";
import {
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip, Area
} from "recharts";

//area chart props
interface IAreaChartProps{
areaChartData: any[];
dataKey: string;
area1Key: string;
area2Key: string;
}

//area chart common component
const AreaChartComp = (props: IAreaChartProps) => {
    const { areaChartData, area1Key, area2Key, dataKey } = props;
    return(
        <AreaChart
        width={500}
        height={400}
        data={areaChartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={area1Key} stackId="1" stroke="#8884d8" fill="#123abc" />
        <Area type="monotone" dataKey={area2Key} stackId="1" stroke="#82ca9d" fill="#8cd1b9" />
      </AreaChart>
    );
};

export default AreaChartComp;