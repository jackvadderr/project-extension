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
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveLine
        data={transformedData}
        margin={{ top: 30, right: 30, bottom: 70, left: 50 }} // Margens ajustadas
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
            colorMap.set(year, transformedData.find(d => d.year === year)?.color || fixedColors[year % fixedColors.length]);
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
          legendOffset: 40,
          legendPosition: 'middle',
          tickValues: monthOrder
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Quantidade',
          legendOffset: -40,
          legendPosition: 'middle'
        }}
        pointSize={8} // Ponto um pouco menor
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableSlices="x" // Mostrar tooltip para todos os pontos do eixo X
        useMesh={true}
        curve="monotoneX" // Curva mais suave
        lineWidth={2}
        tooltip={({ point }) => {
          return (
            <div className="bg-white p-2 border border-gray-300 rounded shadow text-sm">
              <div><strong>{point.data.xFormatted}</strong> {point.serieId.split(' ')[1]}</div>
              <div>Eventos: <strong>{point.data.yFormatted}</strong></div>
            </div>
          );
        }}
        legends={[
          {
            anchor: 'bottom', // Legenda na parte inferior
            direction: 'row', // Em linha horizontal
            justify: false,
            translateY: 60, // Aumentei um pouco o espaço vertical
            itemsSpacing: 25, // Aumentei o espaçamento entre itens
            itemWidth: 100, // Largura um pouco maior
            itemWidth: 80, // Largura reduzida
            itemHeight: 16, // Altura reduzida
            itemOpacity: 0.85,
            symbolSize: 10, // Símbolos menores
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}

export default EventsByMonthChart;
