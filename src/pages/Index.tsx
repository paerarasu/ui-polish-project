import { Header } from "@/components/Header";
import { MetricCard } from "@/components/MetricCard";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Home, TrendingUp, MapPin, Users, Map, BarChart3, Search, Filter, Bell, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={Home}
            label="Active Listings"
            value="2,547"
            trend="+12% from last month"
            trendUp={true}
          />
          <MetricCard
            icon={TrendingUp}
            label="Average Rent"
            value="₹45,000"
            trend="+5% from last month"
            trendUp={true}
          />
          <MetricCard
            icon={MapPin}
            label="Areas Covered"
            value="156"
            trend="3 new this week"
            trendUp={true}
          />
          <MetricCard
            icon={Users}
            label="Active Users"
            value="8,942"
            trend="+23% this month"
            trendUp={true}
          />
        </div>
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
            description="Explore properties on an interactive map with heatmaps, clusters, and detailed markers showing real-time availability."
          />
          <FeatureCard
            icon={BarChart3}
            title="Advanced Analytics"
            description="Compare locations with comprehensive statistics, price trends, and neighborhood insights to make informed decisions."
          />
          <FeatureCard
            icon={Search}
            title="Smart Search"
            description="Filter by location, price range, property type, and amenities to find exactly what you're looking for."
          />
          <FeatureCard
            icon={Filter}
            title="Dynamic Filters"
            description="Refine your search with powerful filters including BHK configuration, rent range, and location preferences."
          />
          <FeatureCard
            icon={Bell}
            title="Price Alerts"
            description="Get notified when properties matching your criteria become available or prices change in your favorite areas."
          />
          <FeatureCard
            icon={Zap}
            title="Real-Time Updates"
            description="Access the latest market data with instant updates on new listings, price changes, and market trends."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-12 text-center backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,140,255,0.15),transparent)]" />
          <div className="relative">
            <h2 className="mb-4 text-4xl font-bold text-foreground">Ready to find your perfect home?</h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Start exploring thousands of rental properties with our advanced search and comparison tools.
            </p>
            <Button asChild size="lg" className="rounded-full bg-primary font-semibold text-primary-foreground shadow-xl transition-all hover:scale-105 hover:shadow-primary/50">
              <Link to="/explorer">
                <Zap className="mr-2 h-5 w-5" />
                Get Started Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-8 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 RentMap. All rights reserved. Real-time rental market explorer.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
