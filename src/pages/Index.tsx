import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, Users, Map, BarChart3, Search, Filter, Bell, Zap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePropertyData } from "@/hooks/usePropertyData";

const Index = () => {
  const { properties, loading } = usePropertyData();

  const totalProperties = properties.length;
  const avgRent = Math.round(properties.reduce((sum, p) => sum + p.price, 0) / totalProperties) || 0;
  const uniqueLocations = new Set(properties.map(p => p.location)).size;
  const avgPricePerSqft = Math.round(properties.reduce((sum, p) => sum + p.price_per_sqft, 0) / totalProperties) || 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-12 text-center backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(74,140,255,0.1),transparent)]" />
          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              <span className="text-sm font-semibold text-secondary">Real-Time Data Updates</span>
            </div>
            <h1 className="mb-4 text-6xl font-extrabold tracking-tight text-gradient md:text-7xl">
              RentMap
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl font-medium text-muted-foreground">
              Discover, compare, and analyze rental properties with powerful real-time insights and interactive visualizations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full bg-primary font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-primary/50">
                <Link to="/explorer">
                  <Map className="mr-2 h-5 w-5" />
                  Explore Map
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-border/50 bg-card/60 font-semibold backdrop-blur-xl transition-all hover:scale-105 hover:border-primary/50">
                <Link to="/compare">
                  <BarChart3 className="mr-2 h-5 w-5" />
                  Compare Locations
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Market Overview</h2>
          <p className="text-muted-foreground">Real-time rental market statistics</p>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={Home}
              label="Active Listings"
              value={totalProperties.toString()}
              trend="Live data"
              trendUp={true}
            />
            <MetricCard
              icon={TrendingUp}
              label="Average Rent"
              value={`₹${avgRent.toLocaleString()}`}
              trend="Per month"
              trendUp={true}
            />
            <MetricCard
              icon={MapPin}
              label="Areas Covered"
              value={uniqueLocations.toString()}
              trend="Locations"
              trendUp={true}
            />
            <MetricCard
              icon={Users}
              label="Price per Sqft"
              value={`₹${avgPricePerSqft}`}
              trend="Average"
              trendUp={true}
            />
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-3xl font-bold text-foreground">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to find the perfect rental property</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={Map}
            title="Interactive Maps"
            description="Visualize properties on an interactive map with real-time data and location markers"
          />
          <FeatureCard
            icon={BarChart3}
            title="Advanced Analytics"
            description="Compare locations with detailed charts and comprehensive market insights"
          />
          <FeatureCard
            icon={Filter}
            title="Smart Filters"
            description="Filter by location, price range, BHK type, and more to find your perfect match"
          />
          <FeatureCard
            icon={TrendingUp}
            title="Price Trends"
            description="Track rental price trends and distribution across different areas"
          />
          <FeatureCard
            icon={Bell}
            title="Real-Time Updates"
            description="Get instant updates on new listings and price changes in your preferred areas"
          />
          <FeatureCard
            icon={Zap}
            title="Quick Search"
            description="Find properties instantly with our lightning-fast search and filtering system"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-12 text-center backdrop-blur-xl">
          <h2 className="mb-4 text-4xl font-bold text-gradient">Ready to Find Your Dream Home?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Start exploring thousands of rental properties with our powerful visualization tools
          </p>
          <Button asChild size="lg" className="rounded-full bg-primary font-semibold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:shadow-primary/50">
            <Link to="/explorer">
              <Search className="mr-2 h-5 w-5" />
              Start Exploring
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
