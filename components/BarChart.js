import { Chart } from '@antv/g2';
import { useEffect, useRef } from 'react';

export default function BarChart(props) {
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
      marginBottom: 30,
      marginLeft: 15,
    });

    chart
      .interval()
      .data(data)
      .encode('x', 'date')
      .encode('y', 'dailyCases')

    chart.render();

    return chart;
  }

  return (
    <div ref={container}></div>
  )
}