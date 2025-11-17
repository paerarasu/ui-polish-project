import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Square, MapPin, Phone, Mail, CheckCircle2, X } from "lucide-react";

export interface Property {
  id: string;
  title: string;
  rent: number;
  location: string;
  bhk: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  latitude: number;
  longitude: number;
  available: boolean;
}

interface PropertyDetailsModalProps {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyDetailsModal = ({ property, open, onOpenChange }: PropertyDetailsModalProps) => {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-secondary">{property.title}</DialogTitle>
        </DialogHeader>

        {/* Images */}
        <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
          {property.images.map((image, index) => (
            <div key={index} className="relative aspect-video bg-muted">
              <img 
                src={image} 
                alt={`${property.title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Price and Location */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-gradient">
              ₹{property.rent.toLocaleString()}<span className="text-sm text-muted-foreground">/month</span>
            </div>
            {property.available && (
              <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                Available Now
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-sm text-muted-foreground">Bedrooms</div>
              <div className="font-semibold">{property.bhk} BHK</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-sm text-muted-foreground">Bathrooms</div>
              <div className="font-semibold">{property.bathrooms}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-5 w-5 text-secondary" />
            <div>
              <div className="text-sm text-muted-foreground">Area</div>
              <div className="font-semibold">{property.area} sq.ft</div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h3 className="text-lg font-bold text-secondary mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {property.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border/50 pt-4">
          <h3 className="text-lg font-bold text-secondary mb-3">Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="font-semibold text-secondary">{property.contactName.charAt(0)}</span>
              </div>
              <div>
                <div className="font-semibold">{property.contactName}</div>
                <div className="text-sm text-muted-foreground">Property Owner</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                <Phone className="mr-2 h-4 w-4" />
                {property.contactPhone}
              </Button>
              <Button variant="outline" className="flex-1 border-secondary/30">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
