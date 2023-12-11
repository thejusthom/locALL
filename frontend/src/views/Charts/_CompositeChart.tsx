import * as React from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from "recharts";

interface ICompositeChartProps{
compositeChartData: any[];
dataKey: string;
areaKey: string;
barKey: string;
line1Key: string;
line2Key: string;
}

const CompositeChartComp = (props: ICompositeChartProps) => {
    const { compositeChartData, dataKey, areaKey, barKey, line1Key, line2Key } = props;

    return(
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
        <XAxis dataKey={dataKey} scale="band" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Area type="monotone" dataKey={areaKey} fill="#9fbddd" stroke="#1976d2" />
        <Bar dataKey={barKey} barSize={20} fill="#123abc" />
        <Line type="monotone" dataKey={line1Key} stroke="#38d200" />
        <Line type="monotone" dataKey={line2Key} stroke="violet" />
      </ComposedChart> 
    );
};

export default CompositeChartComp;