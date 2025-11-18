export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bhk: number;
  area_sqft: number;
  price_per_sqft: number;
  furnishing: string;
  latitude: number;
  longitude: number;
}

export const properties: Property[] = [
  // South Delhi
  { id: '1', title: '3 BHK Apartment in Saket', price: 65000, location: 'South Delhi', bhk: 3, area_sqft: 1800, price_per_sqft: 36, furnishing: 'Semi-Furnished', latitude: 28.5244, longitude: 77.2066 },
  { id: '2', title: '2 BHK Flat in Greater Kailash', price: 55000, location: 'South Delhi', bhk: 2, area_sqft: 1400, price_per_sqft: 39, furnishing: 'Fully Furnished', latitude: 28.5494, longitude: 77.2426 },
  { id: '3', title: '4 BHK Villa in Vasant Vihar', price: 120000, location: 'South Delhi', bhk: 4, area_sqft: 3000, price_per_sqft: 40, furnishing: 'Fully Furnished', latitude: 28.5672, longitude: 77.1585 },
  { id: '4', title: '1 BHK in Malviya Nagar', price: 25000, location: 'South Delhi', bhk: 1, area_sqft: 650, price_per_sqft: 38, furnishing: 'Semi-Furnished', latitude: 28.5355, longitude: 77.2095 },
  { id: '5', title: '2 BHK in Hauz Khas', price: 48000, location: 'South Delhi', bhk: 2, area_sqft: 1200, price_per_sqft: 40, furnishing: 'Unfurnished', latitude: 28.5494, longitude: 77.2001 },
  
  // North Delhi
  { id: '6', title: '3 BHK in Rohini', price: 35000, location: 'North Delhi', bhk: 3, area_sqft: 1500, price_per_sqft: 23, furnishing: 'Semi-Furnished', latitude: 28.7469, longitude: 77.0674 },
  { id: '7', title: '2 BHK in Pitampura', price: 28000, location: 'North Delhi', bhk: 2, area_sqft: 1100, price_per_sqft: 25, furnishing: 'Fully Furnished', latitude: 28.6943, longitude: 77.1311 },
  { id: '8', title: '1 BHK in Model Town', price: 22000, location: 'North Delhi', bhk: 1, area_sqft: 700, price_per_sqft: 31, furnishing: 'Semi-Furnished', latitude: 28.7196, longitude: 77.1910 },
  { id: '9', title: '3 BHK in Shalimar Bagh', price: 38000, location: 'North Delhi', bhk: 3, area_sqft: 1600, price_per_sqft: 24, furnishing: 'Unfurnished', latitude: 28.7244, longitude: 77.1526 },
  { id: '10', title: '2 BHK in Civil Lines', price: 42000, location: 'North Delhi', bhk: 2, area_sqft: 1300, price_per_sqft: 32, furnishing: 'Fully Furnished', latitude: 28.6778, longitude: 77.2273 },
  
  // Central Delhi
  { id: '11', title: '2 BHK in Connaught Place', price: 70000, location: 'Central Delhi', bhk: 2, area_sqft: 1200, price_per_sqft: 58, furnishing: 'Fully Furnished', latitude: 28.6315, longitude: 77.2167 },
  { id: '12', title: '3 BHK in Karol Bagh', price: 50000, location: 'Central Delhi', bhk: 3, area_sqft: 1500, price_per_sqft: 33, furnishing: 'Semi-Furnished', latitude: 28.6519, longitude: 77.1900 },
  { id: '13', title: '1 BHK near Rajiv Chowk', price: 35000, location: 'Central Delhi', bhk: 1, area_sqft: 600, price_per_sqft: 58, furnishing: 'Fully Furnished', latitude: 28.6328, longitude: 77.2197 },
  { id: '14', title: '2 BHK in Paharganj', price: 32000, location: 'Central Delhi', bhk: 2, area_sqft: 950, price_per_sqft: 34, furnishing: 'Unfurnished', latitude: 28.6448, longitude: 77.2167 },
  { id: '15', title: '3 BHK in Rajendra Place', price: 55000, location: 'Central Delhi', bhk: 3, area_sqft: 1700, price_per_sqft: 32, furnishing: 'Semi-Furnished', latitude: 28.6416, longitude: 77.1788 },
  
  // East Delhi
  { id: '16', title: '2 BHK in Preet Vihar', price: 28000, location: 'East Delhi', bhk: 2, area_sqft: 1100, price_per_sqft: 25, furnishing: 'Semi-Furnished', latitude: 28.6428, longitude: 77.2947 },
  { id: '17', title: '3 BHK in Mayur Vihar', price: 38000, location: 'East Delhi', bhk: 3, area_sqft: 1600, price_per_sqft: 24, furnishing: 'Fully Furnished', latitude: 28.6078, longitude: 77.2947 },
  { id: '18', title: '1 BHK in Laxmi Nagar', price: 18000, location: 'East Delhi', bhk: 1, area_sqft: 600, price_per_sqft: 30, furnishing: 'Unfurnished', latitude: 28.6345, longitude: 77.2768 },
  { id: '19', title: '2 BHK in Vasundhara Enclave', price: 32000, location: 'East Delhi', bhk: 2, area_sqft: 1250, price_per_sqft: 26, furnishing: 'Semi-Furnished', latitude: 28.6706, longitude: 77.3094 },
  { id: '20', title: '3 BHK in Noida Sector 62', price: 42000, location: 'East Delhi', bhk: 3, area_sqft: 1750, price_per_sqft: 24, furnishing: 'Fully Furnished', latitude: 28.6271, longitude: 77.3564 },
  
  // West Delhi
  { id: '21', title: '2 BHK in Janakpuri', price: 30000, location: 'West Delhi', bhk: 2, area_sqft: 1200, price_per_sqft: 25, furnishing: 'Semi-Furnished', latitude: 28.6217, longitude: 77.0831 },
  { id: '22', title: '3 BHK in Rajouri Garden', price: 45000, location: 'West Delhi', bhk: 3, area_sqft: 1650, price_per_sqft: 27, furnishing: 'Fully Furnished', latitude: 28.6415, longitude: 77.1215 },
  { id: '23', title: '1 BHK in Punjabi Bagh', price: 20000, location: 'West Delhi', bhk: 1, area_sqft: 700, price_per_sqft: 29, furnishing: 'Unfurnished', latitude: 28.6692, longitude: 77.1315 },
  { id: '24', title: '2 BHK in Vikaspuri', price: 28000, location: 'West Delhi', bhk: 2, area_sqft: 1150, price_per_sqft: 24, furnishing: 'Semi-Furnished', latitude: 28.6417, longitude: 77.0633 },
  { id: '25', title: '4 BHK in Dwarka', price: 65000, location: 'West Delhi', bhk: 4, area_sqft: 2200, price_per_sqft: 30, furnishing: 'Fully Furnished', latitude: 28.5921, longitude: 77.0460 },
  
  // More properties across all areas
  { id: '26', title: '2 BHK in Vasant Kunj', price: 58000, location: 'South Delhi', bhk: 2, area_sqft: 1400, price_per_sqft: 41, furnishing: 'Fully Furnished', latitude: 28.5244, longitude: 77.1571 },
  { id: '27', title: '3 BHK in Ashok Vihar', price: 36000, location: 'North Delhi', bhk: 3, area_sqft: 1550, price_per_sqft: 23, furnishing: 'Semi-Furnished', latitude: 28.6958, longitude: 77.1760 },
  { id: '28', title: '1 BHK in Nehru Place', price: 32000, location: 'South Delhi', bhk: 1, area_sqft: 650, price_per_sqft: 49, furnishing: 'Fully Furnished', latitude: 28.5494, longitude: 77.2501 },
  { id: '29', title: '2 BHK in Tilak Nagar', price: 26000, location: 'West Delhi', bhk: 2, area_sqft: 1050, price_per_sqft: 25, furnishing: 'Unfurnished', latitude: 28.6417, longitude: 77.0952 },
  { id: '30', title: '3 BHK in Kalkaji', price: 52000, location: 'South Delhi', bhk: 3, area_sqft: 1650, price_per_sqft: 32, furnishing: 'Semi-Furnished', latitude: 28.5494, longitude: 77.2586 },
];
