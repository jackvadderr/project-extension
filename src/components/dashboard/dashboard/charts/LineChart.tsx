"use client"
import { ResponsiveLine } from '@nivo/line'

const allData = [
    {
      id: 'eventos',
      data: [
        { x: 'Out', y: 7, year: 2024 },
        { x: 'Nov', y: 9, year: 2024 },
        { x: 'Dez', y: 15, year: 2024 },
        { x: 'Jan', y: 8, year: 2025 },
        { x: 'Feb', y: 5, year: 2025 },
        { x: 'Mar', y: 10, year: 2025 },
        { x: 'Abr', y: 7, year: 2025 },
        { x: 'Mai', y: 6, year: 2025 },
        { x: 'Jun', y: 9, year: 2025 },
        { x: 'Jul', y: 4, year: 2025 },
        { x: 'Ago', y: 11, year: 2025 },
        { x: 'Set', y: 3, year: 2025 },
        { x: 'Out', y: 12, year: 2025 },
        { x: 'Nov', y: 5, year: 2025 },
        { x: 'Dez', y: 8, year: 2025 }
      ]
    }
  ];

const currentMonth = new Date().toLocaleString('default', { month: 'short' });
const currentYear = new Date().getFullYear();

const filteredData = allData.map(series => ({
    ...series,
    data: series.data.filter(point => {
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const pointMonthIndex = monthOrder.indexOf(point.x);
        const currentMonthIndex = monthOrder.indexOf(currentMonth);
        const isCurrentYear = point.year === currentYear;
        const isLastYear = point.year === currentYear - 1;
        const isLastThreeMonthsOfLastYear = pointMonthIndex >= monthOrder.indexOf('Out');
        return (isCurrentYear && pointMonthIndex <= currentMonthIndex) || (isLastYear && isLastThreeMonthsOfLastYear);
    })
}));

const MyResponsiveLine = ({  }) => (
    <ResponsiveLine
        data={filteredData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Mes',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
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
)

export default MyResponsiveLine;