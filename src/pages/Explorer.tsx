import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, TrendingUp, DollarSign, Filter, Search } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import MapboxMap from "@/components/MapboxMap";
import { properties as allProperties } from "@/data/properties";


const Explorer = () => {
  const [rentRange, setRentRange] = useState([10000, 80000]);
  const [location, setLocation] = useState("all");
  const [bhkType, setBhkType] = useState("all");

  // Filter properties based on current filters
  const filteredProperties = useMemo(() => {
    return allProperties.filter(property => {
      const matchesRent = property.price >= rentRange[0] && property.price <= rentRange[1];
      const matchesLocation = location === "all" || 
        property.location.toLowerCase().includes(location.toLowerCase());
      const matchesBhk = bhkType === "all" || property.bhk.toString() === bhkType;
      
      return matchesRent && matchesLocation && matchesBhk;
    });
  }, [rentRange, location, bhkType]);

  // Update chart data based on filtered properties
  const rentDistribution = useMemo(() => {
    const ranges = [
      { range: "0-20k", count: 0, min: 0, max: 20000 },
      { range: "20-40k", count: 0, min: 20000, max: 40000 },
      { range: "40-60k", count: 0, min: 40000, max: 60000 },
      { range: "60-80k", count: 0, min: 60000, max: 80000 },
      { range: "80k+", count: 0, min: 80000, max: 999999 },
    ];
    
    filteredProperties.forEach(prop => {
      const range = ranges.find(r => prop.price >= r.min && prop.price < r.max);
      if (range) range.count++;
    });
    
    return ranges;
  }, [filteredProperties]);

  const bhkDistribution = useMemo(() => {
    const bhkCounts: Record<string, number> = { "1": 0, "2": 0, "3": 0, "4+": 0 };
    
    filteredProperties.forEach(prop => {
      const key = prop.bhk >= 4 ? "4+" : prop.bhk.toString();
      bhkCounts[key]++;
    });
    
    const total = filteredProperties.length || 1;
    return [
      { name: "1 BHK", value: Math.round((bhkCounts["1"] / total) * 100), color: "#4A8CFF" },
      { name: "2 BHK", value: Math.round((bhkCounts["2"] / total) * 100), color: "#00D9FF" },
      { name: "3 BHK", value: Math.round((bhkCounts["3"] / total) * 100), color: "#7C4DFF" },
      { name: "4+ BHK", value: Math.round((bhkCounts["4+"] / total) * 100), color: "#F2D98D" },
    ];
  }, [filteredProperties]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Status Badge */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              <span className="text-sm font-semibold text-secondary">
                {filteredProperties.length} Properties Found - Live Filtering
              </span>
            </div>
          </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-20 border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-2">
                <Filter className="h-5 w-5 text-secondary" />
                <h2 className="text-xl font-bold text-secondary">Filters</h2>
              </div>

              <div className="space-y-6">
                {/* Location Filter */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    <MapPin className="mb-1 inline h-4 w-4" /> Location
                  </label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="border-border/50 bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="south delhi">South Delhi</SelectItem>
                      <SelectItem value="north delhi">North Delhi</SelectItem>
                      <SelectItem value="central delhi">Central Delhi</SelectItem>
                      <SelectItem value="east delhi">East Delhi</SelectItem>
                      <SelectItem value="west delhi">West Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rent Range */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    <DollarSign className="mb-1 inline h-4 w-4" /> Rent Range
                  </label>
                  <div className="space-y-3">
                    <Slider
                      value={rentRange}
                      onValueChange={setRentRange}
                      min={0}
                      max={100000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                      <span>₹{rentRange[0].toLocaleString()}</span>
                      <span>₹{rentRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* BHK Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    <Home className="mb-1 inline h-4 w-4" /> BHK Type
                  </label>
                  <Select value={bhkType} onValueChange={setBhkType}>
                    <SelectTrigger className="border-border/50 bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All BHK Types</SelectItem>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4 BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full rounded-full bg-primary font-semibold shadow-lg hover:scale-105">
                  <Search className="mr-2 h-4 w-4" />
                  Apply Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Map Section */}
            <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-xl font-bold text-secondary">
                  <MapPin className="h-5 w-5" />
                  Interactive Map
                </h3>
                <span className="text-sm text-muted-foreground">
                  {filteredProperties.length} properties shown
                </span>
              </div>
              <div className="h-[500px]">
                <MapboxMap properties={filteredProperties} />
              </div>
            </Card>

            {/* Charts Section */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Rent Distribution */}
              <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-secondary">
                  <TrendingUp className="h-5 w-5" />
                  Rent Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={rentDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="range" stroke="#B8C5D6" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#B8C5D6" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(30, 41, 82, 0.95)',
                        border: '1px solid rgba(74, 140, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#F9FAFB'
                      }}
                    />
                    <Bar dataKey="count" fill="#4A8CFF" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              {/* BHK Distribution */}
              <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
                <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-secondary">
                  <Home className="h-5 w-5" />
                  BHK Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={bhkDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {bhkDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(30, 41, 82, 0.95)',
                        border: '1px solid rgba(74, 140, 255, 0.3)',
                        borderRadius: '12px',
                        color: '#F9FAFB'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
