import { useState } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, TrendingUp, Users, DollarSign, Building } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const locationData = {
  "South Delhi": {
    avgRent: 52000,
    properties: 847,
    avgSize: 1450,
    safety: 4.5,
    transport: 4.7,
    amenities: 4.8,
    popular: "Hauz Khas, GK, Saket",
  },
  "North Delhi": {
    avgRent: 28000,
    properties: 623,
    avgSize: 1200,
    safety: 4.0,
    transport: 4.2,
    amenities: 3.9,
    popular: "Model Town, Pitampura",
  },
  "Central Delhi": {
    avgRent: 45000,
    properties: 412,
    avgSize: 1100,
    safety: 4.3,
    transport: 4.9,
    amenities: 4.5,
    popular: "Connaught Place, Karol Bagh",
  },
};

const comparisonMetrics = [
  { metric: "Safety", southDelhi: 4.5, northDelhi: 4.0, centralDelhi: 4.3 },
  { metric: "Transport", southDelhi: 4.7, northDelhi: 4.2, centralDelhi: 4.9 },
  { metric: "Amenities", southDelhi: 4.8, northDelhi: 3.9, centralDelhi: 4.5 },
  { metric: "Price Value", southDelhi: 3.8, northDelhi: 4.5, centralDelhi: 4.0 },
  { metric: "Connectivity", southDelhi: 4.6, northDelhi: 4.1, centralDelhi: 4.8 },
];

const radarData = [
  { subject: "Safety", A: 90, B: 80, fullMark: 100 },
  { subject: "Transport", A: 94, B: 84, fullMark: 100 },
  { subject: "Amenities", A: 96, B: 78, fullMark: 100 },
  { subject: "Value", A: 76, B: 90, fullMark: 100 },
  { subject: "Connectivity", A: 92, B: 82, fullMark: 100 },
];

const Compare = () => {
  const [location1, setLocation1] = useState("South Delhi");
  const [location2, setLocation2] = useState("North Delhi");

  const data1 = locationData[location1 as keyof typeof locationData];
  const data2 = locationData[location2 as keyof typeof locationData];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gradient">Compare Locations</h1>
          <p className="text-lg text-muted-foreground">Analyze and compare different areas side by side</p>
        </div>

        {/* Location Selectors */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card className="border-border/50 bg-card/60 p-4 backdrop-blur-xl">
            <label className="mb-2 block text-sm font-semibold text-foreground">Location A</label>
            <Select value={location1} onValueChange={setLocation1}>
              <SelectTrigger className="border-border/50 bg-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="South Delhi">South Delhi</SelectItem>
                <SelectItem value="North Delhi">North Delhi</SelectItem>
                <SelectItem value="Central Delhi">Central Delhi</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="border-border/50 bg-card/60 p-4 backdrop-blur-xl">
            <label className="mb-2 block text-sm font-semibold text-foreground">Location B</label>
            <Select value={location2} onValueChange={setLocation2}>
              <SelectTrigger className="border-border/50 bg-muted">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="South Delhi">South Delhi</SelectItem>
                <SelectItem value="North Delhi">North Delhi</SelectItem>
                <SelectItem value="Central Delhi">Central Delhi</SelectItem>
              </SelectContent>
            </Select>
          </Card>
        </div>

        {/* Comparison Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          {/* Location 1 Card */}
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-to-br from-primary/15 to-accent/15 backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/30">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-accent" />
            <div className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{location1}</h2>
              
              <div className="mb-6 rounded-xl bg-primary/10 p-6 text-center">
                <p className="mb-1 text-sm font-medium text-muted-foreground">Average Rent</p>
                <p className="text-4xl font-bold text-primary">₹{data1.avgRent.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Home className="h-4 w-4" /> Properties
                  </span>
                  <span className="text-lg font-bold text-primary">{data1.properties}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Building className="h-4 w-4" /> Avg Size
                  </span>
                  <span className="text-lg font-bold text-primary">{data1.avgSize} sq.ft</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <TrendingUp className="h-4 w-4" /> Transport
                  </span>
                  <span className="text-lg font-bold text-primary">{data1.transport}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Popular Areas
                  </span>
                  <span className="text-right text-sm font-semibold text-foreground">{data1.popular}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Location 2 Card */}
          <Card className="relative overflow-hidden border-secondary/30 bg-gradient-to-br from-secondary/15 to-accent/15 backdrop-blur-xl transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-secondary/30">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-accent" />
            <div className="p-8">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{location2}</h2>
              
              <div className="mb-6 rounded-xl bg-secondary/10 p-6 text-center">
                <p className="mb-1 text-sm font-medium text-muted-foreground">Average Rent</p>
                <p className="text-4xl font-bold text-secondary">₹{data2.avgRent.toLocaleString()}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Home className="h-4 w-4" /> Properties
                  </span>
                  <span className="text-lg font-bold text-secondary">{data2.properties}</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Building className="h-4 w-4" /> Avg Size
                  </span>
                  <span className="text-lg font-bold text-secondary">{data2.avgSize} sq.ft</span>
                </div>
                <div className="flex items-center justify-between border-b border-border/30 pb-3">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <TrendingUp className="h-4 w-4" /> Transport
                  </span>
                  <span className="text-lg font-bold text-secondary">{data2.transport}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <MapPin className="h-4 w-4" /> Popular Areas
                  </span>
                  <span className="text-right text-sm font-semibold text-foreground">{data2.popular}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Comparison Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bar Chart Comparison */}
          <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-secondary">
              <BarChart className="h-5 w-5" />
              Rating Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="metric" stroke="#B8C5D6" style={{ fontSize: '11px' }} />
                <YAxis stroke="#B8C5D6" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 82, 0.95)',
                    border: '1px solid rgba(74, 140, 255, 0.3)',
                    borderRadius: '12px',
                    color: '#F9FAFB'
                  }}
                />
                <Legend />
                <Bar dataKey="southDelhi" fill="#4A8CFF" name={location1} radius={[8, 8, 0, 0]} />
                <Bar dataKey="northDelhi" fill="#F2D98D" name={location2} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Radar Chart */}
          <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-secondary">
              <TrendingUp className="h-5 w-5" />
              Overall Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" stroke="#B8C5D6" style={{ fontSize: '12px' }} />
                <PolarRadiusAxis stroke="#B8C5D6" />
                <Radar name={location1} dataKey="A" stroke="#4A8CFF" fill="#4A8CFF" fillOpacity={0.5} />
                <Radar name={location2} dataKey="B" stroke="#F2D98D" fill="#F2D98D" fillOpacity={0.5} />
                <Legend />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(30, 41, 82, 0.95)',
                    border: '1px solid rgba(74, 140, 255, 0.3)',
                    borderRadius: '12px',
                    color: '#F9FAFB'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Compare;
