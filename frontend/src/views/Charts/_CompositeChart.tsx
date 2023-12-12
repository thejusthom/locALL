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