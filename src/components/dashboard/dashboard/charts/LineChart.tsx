"use client"
import { ResponsiveLine } from '@nivo/line'

const fixedColors = [
  "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
  "#33FFF5", "#FF8C33", "#8CFF33", "#338CFF", "#FF338C"
];

const getColor = (year: number, index: number) => {
  if (index < fixedColors.length) {
    return fixedColors[index];
  }
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

interface DataPoint {
  x: string;
  y: number | null;
  year: number;
}

interface SeriesData {
  id: string;
  data: DataPoint[];
  year?: number;
}

interface EventsByMonthChartProps {
  data: SeriesData[];
}

const monthOrder = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// Função para gerar cores aleatórias
const getRandomColor = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

const EventsByMonthChart = ({ data }: EventsByMonthChartProps) => {
  const transformedData = data.flatMap(series => {
    const byYear: Record<number, DataPoint[]> = {};

    series.data.forEach(point => {
      if (!byYear[point.year]) {
        byYear[point.year] = [];
      }
      byYear[point.year].push(point);
    });

    return Object.entries(byYear).map(([year, points], index) => {
      const yearNumber = parseInt(year);

      const monthMap = new Map(points.map(p => [p.x, p.y]));

      const fullYearData = monthOrder.map(month => ({
        x: month,
        y: monthMap.get(month) ?? null,
        year: yearNumber
      }));

      return {
        id: `${series.id} ${year}`,
        data: fullYearData,
        year: yearNumber,
        color: getColor(yearNumber, index)
      };
    });
  });

  const colorMap = new Map<number, string>();

  return (
    <ResponsiveLine
      data={transformedData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
      }}
      colors={({ id }) => {
        const year = parseInt(id.split(' ').pop() || '0');
        if (!colorMap.has(year)) {
          colorMap.set(year, transformedData.find(d => d.year === year)?.color || getRandomColor());
        }
        return colorMap.get(year)!;
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Mês',
        legendOffset: 36,
        legendPosition: 'middle',
        truncateTickAt: 0,
        tickValues: monthOrder
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Quantidade',
        legendOffset: -40,
        legendPosition: 'middle',
        truncateTickAt: 0
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      tooltip={({ point }) => {
        return (
          <div style={{
            background: 'white',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}>
            <div><strong>{point.data.xFormatted}</strong> {point.serieId.split(' ')[1]}</div>
            <div>Eventos: <strong>{point.data.yFormatted}</strong></div>
          </div>
        );
      }}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
}

export default EventsByMonthChart;
