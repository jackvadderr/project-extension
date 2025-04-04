"use client"
import { ResponsiveLine } from '@nivo/line'

interface DataPoint {
  x: string;
  y: number | null; // Pode ser nulo para meses sem eventos
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

// Ordem fixa dos meses em português
const monthOrder = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const EventsByMonthChart = ({ data }: EventsByMonthChartProps) => {
  // Processamento dos dados para garantir que todos os meses apareçam
  const transformedData = data.flatMap(series => {
    const byYear: Record<number, DataPoint[]> = {};

    // Agrupar os pontos por ano
    series.data.forEach(point => {
      if (!byYear[point.year]) {
        byYear[point.year] = [];
      }
      byYear[point.year].push(point);
    });

    return Object.entries(byYear).map(([year, points]) => {
      const yearNumber = parseInt(year);

      // Criar um mapa dos meses já presentes
      const monthMap = new Map(points.map(p => [p.x, p.y]));

      // Garantir que todos os meses apareçam
      const fullYearData = monthOrder.map(month => ({
        x: month,
        y: monthMap.get(month) ?? null, // Se não houver dado para o mês, usar null
        year: yearNumber
      }));

      return {
        id: `${series.id} ${year}`,
        data: fullYearData,
        year: yearNumber
      };
    });
  });

  // Definir cores diferentes para cada ano
  const colors = ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'];

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
        return colors[year % colors.length];
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
        tickValues: monthOrder // Força a ordem correta dos meses no eixo X
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
