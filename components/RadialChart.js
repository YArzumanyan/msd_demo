import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

export default function RadialChart(props) {
  const container = useRef(null);
  const chart = useRef(null);

  useEffect(() => {
    if (!chart.current) {
      chart.current = renderChart(container.current, props.data);
    }
  }, []);

  function renderChart(container, data) {
    const chart = new Chart({
      container,
    });
    
    chart.coordinate({ type: 'radial', innerRadius: 0.1, endAngle: Math.PI });
  
    chart
      .interval()
      .data(data)
      .encode('x', 'date')
      .encode('y', 'cumulativeCases')
      .encode('color', 'cumulativeCases')
      .style('stroke', 'white')
      .scale('color', {
        range: '#BAE7FF-#1890FF-#0050B3',
      })
      .scale('y', {
        type: 'linear',
        domain: [0, 2500000]
      })
      .animate('enterType', 'waveIn')
      .animate('enterDuration', 800);
    
    chart.render();

    return chart;
  }

  return (
    <div ref={container}></div>
  )
}
