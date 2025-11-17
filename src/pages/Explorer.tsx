import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Home, TrendingUp, DollarSign, Filter, Search, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { usePropertyData } from "@/hooks/usePropertyData";
import { PropertyMap } from "@/components/PropertyMap";

const Explorer = () => {
  const { properties, loading, error } = usePropertyData();
  const [rentRange, setRentRange] = useState([0, 150000]);
  const [location, setLocation] = useState("all");
  const [bhkType, setBhkType] = useState("all");

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesRent = property.price >= rentRange[0] && property.price <= rentRange[1];
      const matchesLocation = location === "all" || property.location === location;
      const matchesBhk = bhkType === "all" || property.bhk.toString() === bhkType;
      return matchesRent && matchesLocation && matchesBhk;
    });
  }, [properties, rentRange, location, bhkType]);

  const rentDistribution = useMemo(() => {
    const ranges = [
      { range: "0-20k", min: 0, max: 20000, count: 0 },
      { range: "20-40k", min: 20000, max: 40000, count: 0 },
      { range: "40-60k", min: 40000, max: 60000, count: 0 },
      { range: "60-80k", min: 60000, max: 80000, count: 0 },
      { range: "80k+", min: 80000, max: Infinity, count: 0 },
    ];

    filteredProperties.forEach(property => {
      const range = ranges.find(r => property.price >= r.min && property.price < r.max);
      if (range) range.count++;
    });

    return ranges.map(({ range, count }) => ({ range, count }));
  }, [filteredProperties]);

  const bhkDistribution = useMemo(() => {
    const bhkCounts: { [key: number]: number } = {};
    filteredProperties.forEach(property => {
      bhkCounts[property.bhk] = (bhkCounts[property.bhk] || 0) + 1;
    });

    const colors = ["#4A8CFF", "#00D9FF", "#7C4DFF", "#F2D98D"];
    return Object.entries(bhkCounts).map(([bhk, count], index) => ({
      name: `${bhk} BHK`,
      value: count,
      color: colors[index % colors.length]
    }));
  }, [filteredProperties]);

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(properties.map(p => p.location))).sort();
  }, [properties]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">Error loading data: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            <span className="text-sm font-semibold text-secondary">
              Live Data - {filteredProperties.length} properties found
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <Card className="sticky top-20 border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center gap-2">
                <Filter className="h-5 w-5 text-secondary" />
                <h2 className="text-xl font-bold text-secondary">Filters</h2>
              </div>

              <div className="space-y-6">
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
                      {uniqueLocations.map(loc => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    <DollarSign className="mb-1 inline h-4 w-4" /> Rent Range
                  </label>
                  <div className="space-y-3">
                    <Slider
                      value={rentRange}
                      onValueChange={setRentRange}
                      min={0}
                      max={150000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                      <span>₹{rentRange[0].toLocaleString()}</span>
                      <span>₹{rentRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-foreground">
                    <Home className="mb-1 inline h-4 w-4" /> BHK Type
                  </label>
                  <Select value={bhkType} onValueChange={setBhkType}>
                    <SelectTrigger className="border-border/50 bg-muted">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="1">1 BHK</SelectItem>
                      <SelectItem value="2">2 BHK</SelectItem>
                      <SelectItem value="3">3 BHK</SelectItem>
                      <SelectItem value="4">4 BHK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full rounded-full bg-primary font-semibold shadow-lg hover:scale-105 transition-all">
                  <Search className="mr-2 h-4 w-4" />
                  {filteredProperties.length} Results
                </Button>
              </div>
            </Card>
          </aside>

          <div className="space-y-6 lg:col-span-3">
            <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-secondary">
                <MapPin className="h-5 w-5" />
                Interactive Map - {filteredProperties.length} Properties
              </h3>
              <div className="h-[500px] rounded-xl overflow-hidden">
                <PropertyMap properties={filteredProperties} />
              </div>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
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
                      label={({ name, value }) => `${name}: ${value}`}
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
