import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, TrendingUp, Home, DollarSign, Maximize, Loader2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { usePropertyData } from "@/hooks/usePropertyData";

const Compare = () => {
  const { properties, loading, error } = usePropertyData();
  const [location1, setLocation1] = useState("");
  const [location2, setLocation2] = useState("");

  const uniqueLocations = useMemo(() => {
    return Array.from(new Set(properties.map(p => p.location))).sort();
  }, [properties]);

  const location1Data = useMemo(() => {
    return properties.filter(p => p.location === location1);
  }, [properties, location1]);

  const location2Data = useMemo(() => {
    return properties.filter(p => p.location === location2);
  }, [properties, location2]);

  const comparisonData = useMemo(() => {
    if (!location1 || !location2) return [];

    const avgPrice1 = location1Data.reduce((sum, p) => sum + p.price, 0) / location1Data.length || 0;
    const avgPrice2 = location2Data.reduce((sum, p) => sum + p.price, 0) / location2Data.length || 0;

    const avgArea1 = location1Data.reduce((sum, p) => sum + p.area_sqft, 0) / location1Data.length || 0;
    const avgArea2 = location2Data.reduce((sum, p) => sum + p.area_sqft, 0) / location2Data.length || 0;

    const avgPricePerSqft1 = location1Data.reduce((sum, p) => sum + p.price_per_sqft, 0) / location1Data.length || 0;
    const avgPricePerSqft2 = location2Data.reduce((sum, p) => sum + p.price_per_sqft, 0) / location2Data.length || 0;

    return [
      {
        metric: "Avg Rent (₹)",
        [location1]: Math.round(avgPrice1),
        [location2]: Math.round(avgPrice2),
      },
      {
        metric: "Avg Area (sqft)",
        [location1]: Math.round(avgArea1),
        [location2]: Math.round(avgArea2),
      },
      {
        metric: "₹/Sqft",
        [location1]: Math.round(avgPricePerSqft1),
        [location2]: Math.round(avgPricePerSqft2),
      },
    ];
  }, [location1, location2, location1Data, location2Data]);

  const radarData = useMemo(() => {
    if (!location1 || !location2) return [];

    const getScore = (data: typeof location1Data) => {
      const avgPrice = data.reduce((sum, p) => sum + p.price, 0) / data.length || 0;
      const avgArea = data.reduce((sum, p) => sum + p.area_sqft, 0) / data.length || 0;
      const avgPricePerSqft = data.reduce((sum, p) => sum + p.price_per_sqft, 0) / data.length || 0;
      const propertiesCount = data.length;

      return {
        affordability: Math.max(0, Math.min(100, 100 - (avgPrice / 1200))),
        space: Math.min(100, (avgArea / 40)),
        value: Math.max(0, Math.min(100, 100 - (avgPricePerSqft * 2.5))),
        availability: Math.min(100, propertiesCount * 20),
      };
    };

    const scores1 = getScore(location1Data);
    const scores2 = getScore(location2Data);

    return [
      { category: "Affordability", [location1]: scores1.affordability, [location2]: scores2.affordability },
      { category: "Space", [location1]: scores1.space, [location2]: scores2.space },
      { category: "Value", [location1]: scores1.value, [location2]: scores2.value },
      { category: "Availability", [location1]: scores1.availability, [location2]: scores2.availability },
    ];
  }, [location1, location2, location1Data, location2Data]);

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
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gradient">Compare Locations</h1>
          <p className="text-lg text-muted-foreground">Analyze and compare different areas side by side</p>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
            <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-secondary">
              <MapPin className="h-5 w-5" />
              Location 1
            </label>
            <Select value={location1} onValueChange={setLocation1}>
              <SelectTrigger className="border-border/50 bg-muted">
                <SelectValue placeholder="Select first location" />
              </SelectTrigger>
              <SelectContent>
                {uniqueLocations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {location1 && (
              <div className="mt-4 space-y-3 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" /> Properties:
                  </span>
                  <span className="font-semibold text-foreground">{location1Data.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" /> Avg Rent:
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹{Math.round(location1Data.reduce((sum, p) => sum + p.price, 0) / location1Data.length || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Maximize className="h-4 w-4" /> Avg Area:
                  </span>
                  <span className="font-semibold text-foreground">
                    {Math.round(location1Data.reduce((sum, p) => sum + p.area_sqft, 0) / location1Data.length || 0)} sqft
                  </span>
                </div>
              </div>
            )}
          </Card>

          <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
            <label className="mb-3 flex items-center gap-2 text-lg font-semibold text-secondary">
              <MapPin className="h-5 w-5" />
              Location 2
            </label>
            <Select value={location2} onValueChange={setLocation2}>
              <SelectTrigger className="border-border/50 bg-muted">
                <SelectValue placeholder="Select second location" />
              </SelectTrigger>
              <SelectContent>
                {uniqueLocations.map(loc => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {location2 && (
              <div className="mt-4 space-y-3 rounded-lg bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Home className="h-4 w-4" /> Properties:
                  </span>
                  <span className="font-semibold text-foreground">{location2Data.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" /> Avg Rent:
                  </span>
                  <span className="font-semibold text-foreground">
                    ₹{Math.round(location2Data.reduce((sum, p) => sum + p.price, 0) / location2Data.length || 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Maximize className="h-4 w-4" /> Avg Area:
                  </span>
                  <span className="font-semibold text-foreground">
                    {Math.round(location2Data.reduce((sum, p) => sum + p.area_sqft, 0) / location2Data.length || 0)} sqft
                  </span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {location1 && location2 && (
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-secondary">
                <TrendingUp className="h-5 w-5" />
                Metrics Comparison
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="metric" stroke="#B8C5D6" />
                  <YAxis stroke="#B8C5D6" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(30, 41, 82, 0.95)',
                      border: '1px solid rgba(74, 140, 255, 0.3)',
                      borderRadius: '12px',
                      color: '#F9FAFB'
                    }}
                  />
                  <Legend />
                  <Bar dataKey={location1} fill="#4A8CFF" radius={[8, 8, 0, 0]} />
                  <Bar dataKey={location2} fill="#00D9FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card className="border-border/50 bg-card/60 p-6 backdrop-blur-xl">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-secondary">
                <Home className="h-5 w-5" />
                Overall Comparison Score
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="category" stroke="#B8C5D6" />
                  <PolarRadiusAxis stroke="#B8C5D6" />
                  <Radar name={location1} dataKey={location1} stroke="#4A8CFF" fill="#4A8CFF" fillOpacity={0.6} />
                  <Radar name={location2} dataKey={location2} stroke="#00D9FF" fill="#00D9FF" fillOpacity={0.6} />
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
        )}

        {(!location1 || !location2) && (
          <Card className="border-border/50 bg-card/60 p-12 backdrop-blur-xl text-center">
            <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold text-foreground">Select Locations to Compare</h3>
            <p className="text-muted-foreground">Choose two locations from the dropdowns above to see detailed comparisons</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Compare;
