"use client";

import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

interface ChartData {
  name: string;
  visitors: number;
}

interface PieChartProps {
  chartData: ChartData[];
  colors?: string[];
}

const PieChartSection: React.FC<PieChartProps> = ({ chartData, colors = ["#5196E2", "#999999", "#EAF2FC"] }) => {
  return (

      <PieChart width={250} height={250}>
        <Pie
          data={chartData}
          dataKey="visitors"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          label
        >
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
   
  );
};

export default PieChartSection;
