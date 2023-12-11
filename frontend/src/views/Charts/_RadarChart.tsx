import * as React from "react";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Tooltip,
    Legend
} from "recharts";

interface IRadarChartProps{
radarChartData: any[];
dataKey: string;
radar1Name: string;
radar2Name: string;
radar1Key: string;
radar2Key: string;
}

const RadarChartComp = (props: IRadarChartProps) => {
    const { radar1Key, radar1Name, radar2Key, radar2Name, radarChartData, dataKey } = props;

    return(
        <RadarChart outerRadius={90} width={730} height={250} data={radarChartData}>
  <PolarGrid />
  <PolarAngleAxis dataKey={dataKey} />
  <PolarRadiusAxis angle={30} />
  <Tooltip />
  <Radar name={radar1Name} dataKey={radar1Key} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
  <Radar name={radar2Name} dataKey={radar2Key} stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
  <Legend />
</RadarChart>
    );
};

export default RadarChartComp;