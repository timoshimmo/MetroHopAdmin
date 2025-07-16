
'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from './ui/chart';

interface FuelConsumptionChartProps {
    data: { busId: string; kmPerLiter: number }[];
}

const chartConfig = {
    kmPerLiter: {
      label: "KM/L",
      color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function FuelConsumptionChart({ data }: FuelConsumptionChartProps) {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart
                accessibilityLayer
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: -20,
                    bottom: 5,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="busId"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(-4)}
                />
                <YAxis
                    dataKey="kmPerLiter"
                    tickFormatter={(value) => `${value.toFixed(1)}`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        formatter={(value, name, props) => (
                            <div className="flex flex-col">
                                <span className="font-semibold">{props.payload.busId}</span>
                                <span className="text-sm text-muted-foreground">
                                    Efficiency: {Number(value).toFixed(2)} km/L
                                </span>
                            </div>
                        )}
                        labelFormatter={(label) => `Bus ID: ${label}`}
                        indicator="dot"
                    />}
                />
                <Bar dataKey="kmPerLiter" fill="var(--color-kmPerLiter)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
