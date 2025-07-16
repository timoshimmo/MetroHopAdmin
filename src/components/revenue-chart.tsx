
'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ChartConfig, ChartContainer, ChartTooltipContent } from './ui/chart';

interface RevenueChartProps {
    data: { vehicleId: string; revenue: number }[];
}

const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))",
    },
} satisfies ChartConfig

export function RevenueChart({ data }: RevenueChartProps) {
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
                    dataKey="vehicleId"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(-4)}
                />
                <YAxis
                    tickFormatter={(value) => `₦${Number(value) / 1000}k`}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                />
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        formatter={(value, name) => (
                            <div className="flex flex-col">
                                <span className="font-semibold">{name}</span>
                                <span className="text-sm text-muted-foreground">
                                    Revenue: ₦{Number(value).toLocaleString()}
                                </span>
                            </div>
                        )}
                        labelFormatter={(label) => `Bus ID: ${label}`}
                        indicator="dot"
                    />}
                />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
