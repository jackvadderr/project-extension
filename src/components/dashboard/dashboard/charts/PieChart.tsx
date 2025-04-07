"use client"
import { ResponsivePie } from '@nivo/pie'

const EventDistribution = ({ data }) => (
  <div className="w-full h-full min-h-[300px]">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
        innerRadius={0.4}
        padAngle={0.5}
        cornerRadius={2}
        activeOuterRadiusOffset={6}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={15}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLinkLabelsDiagonalLength={6}
        arcLinkLabelsStraightLength={8}
        arcLabelsSkipAngle={15}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
        }}
        arcLabel={(d) => `${d.data.percentageLabel}`}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 3, // Tamanho do padrão reduzido
                padding: 1,
                stagger: true,
            },
        ]}
        fill={data.map((item: any) => ({ match: { id: item.id }, id: 'dots' }))}
        legends={[
            {
                anchor: 'bottom', // Legenda na parte inferior
                direction: 'row', // Em linha horizontal
                justify: false,
                translateX: 0,
                translateY: 30, // Posicionada abaixo do gráfico
                itemsSpacing: 10, // Espaçamento entre itens
                itemWidth: 80, // Largura reduzida
                itemHeight: 14, // Altura reduzida
                itemTextColor: '#666',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 12, // Símbolos menores
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        },
                    },
                ],
            },
        ]}
        motionConfig="gentle" // Animação mais suave
      />
  </div>
);

export default EventDistribution;
