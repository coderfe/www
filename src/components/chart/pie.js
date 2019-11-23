import DataSet from '@antv/data-set';
import { Chart, Coord, Geom, Shape, Tooltip } from 'bizcharts';
import React from 'react';

class WordCloud extends React.Component {
  render() {
    function getTextAttrs(cfg) {
      return Object.assign({}, cfg.style, {
        fillOpacity: cfg.opacity,
        fontSize: cfg.origin._origin.size,
        rotate: cfg.origin._origin.rotate,
        text: cfg.origin._origin.text,
        textAlign: 'center',
        fontFamily: cfg.origin._origin.font,
        fill: cfg.color,
        textBaseline: 'Alphabetic',
      });
    } // 给point注册一个词云的shape

    Shape.registerShape('point', 'cloud', {
      drawShape(cfg, container) {
        const attrs = getTextAttrs(cfg);
        return container.addShape('text', {
          attrs: Object.assign(attrs, {
            x: cfg.x,
            y: cfg.y,
          }),
        });
      },
    });
    const dv = new DataSet.View().source(this.props.data);
    const range = dv.range('value');
    const min = range[0];
    const max = range[1];
    dv.transform({
      type: 'tag-cloud',
      fields: ['x', 'value'],
      size: [window.innerWidth, window.innerHeight],
      font: 'Verdana',
      padding: 0,
      timeInterval: 5000,

      // max execute time
      rotate() {
        let random = ~~(Math.random() * 4) % 4;

        if (random === 2) {
          random = 0;
        }

        return random * 90; // 0, 90, 270
      },

      fontSize(d) {
        if (d.value) {
          const divisor = max - min !== 0 ? max - min : 1;
          return ((d.value - min) / divisor) * (80 - 24) + 24;
        }

        return 0;
      },
    });
    const scale = {
      x: {
        nice: false,
      },
      y: {
        nice: false,
      },
    };
    return (
      <div>
        <Chart height={800} width={1200} data={dv} scale={scale} padding={0}>
          <Tooltip showTitle={false} />
          <Coord reflect="y" />
          <Geom
            type="point"
            position="x*y"
            color="category"
            shape="cloud"
            tooltip="value*category"
          />
        </Chart>
      </div>
    );
  }
}

export default WordCloud;
