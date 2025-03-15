"use client"
import { ResponsivePie } from '@nivo/pie'

const eventData = [
    {
        id: "Festa de Aniversário",
        label: "Festa de Aniversário",
        value: 40,
        color: "hsl(205, 70%, 50%)"
    },
    {
        id: "Churrasco",
        label: "Churrasco",
        value: 30,
        color: "hsl(100, 70%, 50%)"
    },
    {
        id: "Reunião",
        label: "Reunião",
        value: 20,
        color: "hsl(50, 70%, 50%)"
    },
    {
        id: "Workshop",
        label: "Workshop",
        value: 10,
        color: "hsl(300, 70%, 50%)"
    }
];

const MyResponsivePie = () => (
    <ResponsivePie
        data={eventData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Festa de Aniversário'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Churrasco'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Reunião'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'Workshop'
                },
                id: 'dots'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsivePie;