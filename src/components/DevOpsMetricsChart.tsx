import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { name: "Week 1", efficiency: 40, errors: 24, label: "Initial" },
    { name: "Week 2", efficiency: 55, errors: 18, label: "Optimization" },
    { name: "Week 3", efficiency: 75, errors: 10, label: "Automation" },
    { name: "Week 4", efficiency: 85, errors: 5, label: "AI Healing" },
    { name: "Week 5", efficiency: 95, errors: 1, label: "Peak Perf" },
];

const DevOpsMetricsChart = () => {
    return (
        <Card className="bg-black/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-cyan-400">DevOps Performance</CardTitle>
                <CardDescription>Efficiency vs Error Rate over time</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f472b6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#f472b6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}%`} />
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", borderRadius: "8px" }}
                                itemStyle={{ color: "#e2e8f0" }}
                            />
                            <Area
                                type="monotone"
                                dataKey="efficiency"
                                stroke="#22d3ee"
                                fillOpacity={1}
                                fill="url(#colorEfficiency)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="errors"
                                stroke="#f472b6"
                                fillOpacity={1}
                                fill="url(#colorErrors)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DevOpsMetricsChart;
