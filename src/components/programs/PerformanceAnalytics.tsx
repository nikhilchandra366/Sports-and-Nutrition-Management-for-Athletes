
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  Bar, 
  Line, 
  Pie, 
  BarChart as RechartsBarChart, 
  LineChart as RechartsLineChart, 
  PieChart as RechartsPieChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from "recharts";

// Custom BarChart component using ChartContainer
const BarChart = ({ 
  data, 
  categories, 
  index, 
  colors, 
  valueFormatter, 
  showLegend = true,
  showXAxis = true,
  showYAxis = true
}) => (
  <ChartContainer config={{}} className="h-full w-full">
    <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
      {showXAxis && <XAxis dataKey={index} />}
      {showYAxis && <YAxis />}
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Tooltip content={({ active, payload, label }) => {
        if (active && payload?.length) {
          return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
              <div className="font-medium">{label}</div>
              <div className="mt-1 flex flex-col gap-0.5">
                {payload.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {valueFormatter ? valueFormatter(item.value) : item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return null;
      }} />
      {showLegend && <Legend />}
      {categories.map((category, index) => (
        <Bar 
          key={category}
          dataKey={category}
          fill={colors ? colors[index % colors.length] : undefined}
          radius={[4, 4, 0, 0]}
        />
      ))}
    </RechartsBarChart>
  </ChartContainer>
);

// Custom LineChart component using ChartContainer
const LineChart = ({ 
  data, 
  categories, 
  index, 
  colors, 
  valueFormatter, 
  showLegend = true,
  showXAxis = true,
  showYAxis = true
}) => (
  <ChartContainer config={{}} className="h-full w-full">
    <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
      {showXAxis && <XAxis dataKey={index} />}
      {showYAxis && <YAxis />}
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip content={({ active, payload, label }) => {
        if (active && payload?.length) {
          return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
              <div className="font-medium">{label}</div>
              <div className="mt-1 flex flex-col gap-0.5">
                {payload.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="h-2 w-2 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.name}: {valueFormatter ? valueFormatter(item.value) : item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        return null;
      }} />
      {showLegend && <Legend />}
      {categories.map((category, index) => (
        <Line 
          key={category}
          type="monotone"
          dataKey={category}
          stroke={colors ? colors[index % colors.length] : undefined}
          activeDot={{ r: 8 }}
        />
      ))}
    </RechartsLineChart>
  </ChartContainer>
);

// Custom PieChart component using ChartContainer
const PieChart = ({ 
  data, 
  category, 
  index, 
  colors, 
  valueFormatter 
}) => (
  <ChartContainer config={{}} className="h-full w-full">
    <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey={category}
        nameKey={index}
        label={({ name, percent }) => `${name} ${valueFormatter ? valueFormatter(percent * 100) : `${(percent * 100).toFixed(0)}%`}`}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors ? colors[index % colors.length] : undefined} />
        ))}
      </Pie>
      <Tooltip content={({ active, payload }) => {
        if (active && payload?.length) {
          const item = payload[0];
          return (
            <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
              <div className="font-medium">{item.name}</div>
              <div className="mt-1 flex items-center gap-2">
                <div 
                  className="h-2 w-2 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">
                  {valueFormatter ? valueFormatter(item.value) : item.value}
                </span>
              </div>
            </div>
          );
        }
        return null;
      }} />
    </RechartsPieChart>
  </ChartContainer>
);

export function PerformanceAnalytics() {
  // Sample data - in a real application, this would come from the backend
  const weeklyData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 35 },
    { name: "Fri", value: 55 },
    { name: "Sat", value: 25 },
    { name: "Sun", value: 15 },
  ];

  const monthlyData = [
    { name: "Week 1", value: 200 },
    { name: "Week 2", value: 250 },
    { name: "Week 3", value: 180 },
    { name: "Week 4", value: 320 },
  ];

  const progressData = [
    { date: "Jan", squat: 100, deadlift: 150, bench: 80 },
    { date: "Feb", squat: 110, deadlift: 160, bench: 85 },
    { date: "Mar", squat: 115, deadlift: 170, bench: 90 },
    { date: "Apr", squat: 125, deadlift: 180, bench: 100 },
    { date: "May", squat: 135, deadlift: 200, bench: 110 },
  ];

  const pieData = [
    { name: "Strength", value: 40 },
    { name: "Cardio", value: 30 },
    { name: "Flexibility", value: 20 },
    { name: "Recovery", value: 10 },
  ];

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Performance Analytics</CardTitle>
          <CardDescription>Track your progress and improvement over time</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress">
          <TabsList className="mb-4">
            <TabsTrigger value="progress">Strength Progress</TabsTrigger>
            <TabsTrigger value="workout">Workout Volume</TabsTrigger>
            <TabsTrigger value="distribution">Training Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="space-y-4">
            <div className="h-80 w-full">
              <LineChart
                data={progressData}
                categories={["squat", "deadlift", "bench"]}
                index="date"
                colors={["#9b87f5", "#7E69AB", "#33C3F0"]}
                valueFormatter={(value) => `${value}kg`}
                showLegend={true}
                showXAxis={true}
                showYAxis={true}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Squat", value: "135kg", increase: "+10kg" },
                { label: "Deadlift", value: "200kg", increase: "+20kg" },
                { label: "Bench Press", value: "110kg", increase: "+10kg" },
              ].map((stat) => (
                <Card key={stat.label} className="p-4">
                  <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                  <div className="mt-1 flex items-baseline">
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="ml-2 text-xs font-medium text-green-500">{stat.increase}</div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="workout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <CardTitle className="text-base mb-4">Weekly Workout Volume</CardTitle>
                <div className="h-72">
                  <BarChart
                    data={weeklyData}
                    categories={["value"]}
                    index="name"
                    colors={["#9b87f5"]}
                    valueFormatter={(value) => `${value} min`}
                    showLegend={false}
                  />
                </div>
              </Card>
              <Card className="p-4">
                <CardTitle className="text-base mb-4">Monthly Workout Volume</CardTitle>
                <div className="h-72">
                  <BarChart
                    data={monthlyData}
                    categories={["value"]}
                    index="name"
                    colors={["#7E69AB"]}
                    valueFormatter={(value) => `${value} min`}
                    showLegend={false}
                  />
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="distribution">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="h-80 w-full md:w-1/2">
                <PieChart
                  data={pieData}
                  category="value"
                  index="name"
                  colors={["#9b87f5", "#7E69AB", "#33C3F0", "#D6BCFA"]}
                  valueFormatter={(value) => `${value}%`}
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h4 className="text-lg font-semibold">Training Type Distribution</h4>
                <p className="text-muted-foreground mb-4">
                  Your current training plan focuses primarily on strength with a balanced approach to cardio and flexibility.
                </p>
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="h-3 w-3 rounded-full mr-2"
                        style={{ backgroundColor: item.name === "Strength" ? "#9b87f5" : 
                                               item.name === "Cardio" ? "#7E69AB" : 
                                               item.name === "Flexibility" ? "#33C3F0" : "#D6BCFA" }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
