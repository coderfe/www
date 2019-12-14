import React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';

export default function LineChart({ data, cols }) {
  return (
    <Chart placeholder height={400} data={data} scale={cols} forceFit>
      <Axis
        name="month"
        title={null}
        tickLine={null}
        line={{
          stroke: '#E6E6E6',
        }}
      />
      <Axis name="acc" line={false} tickLine={null} grid={null} title={null} />
      <Tooltip />
      <Geom
        type="line"
        position="month*acc"
        size={2}
        color="l (270) 0:rgba(255, 146, 255, 1) .5:rgba(100, 268, 255, 1)
            1:rgba(215, 0, 255, 1)"
        shape="smooth"
        style={{
          shadowColor: 'l (270) 0:rgba(21, 146, 255, 0)',
          shadowBlur: 60,
          shadowOffsetY: 6,
        }}
      />
    </Chart>
  );
}
