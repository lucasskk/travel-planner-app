// Shared TypeScript types for Travel Planner

export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  budgetRange: [number, number];
  travelType: 'leisure' | 'business' | 'family';
  accommodationType: 'hotel' | 'hostel' | 'apartment' | 'any';
  flightClass: 'economy' | 'business' | 'first';
  preferredDepartureTimes: string[];
  flexibleDates: boolean;
  maxTravelDuration: number; // in days
}

export interface Destination {
  id: string;
  city: string;
  country: string;
  airportCode: string;
  region: string;
  climate: string;
  averageTemperature: number;
  bestMonths: string[];
  attractions: string[];
  safetyRating: number;
  costLevel: 'low' | 'medium' | 'high';
  imageUrl?: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number;
  currency: string;
  stops: number;
  class: 'economy' | 'business' | 'first';
  bookingUrl: string;
}

export interface HotelOption {
  id: string;
  name: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  location: string;
  imageUrl?: string;
  bookingUrl: string;
}

export interface TripSuggestion {
  id: string;
  destination: Destination;
  dates: {
    departure: string;
    return: string;
  };
  costs: {
    flight: number;
    hotel: number;
    total: number;
    currency: string;
  };
  flightOptions: FlightOption[];
  hotelOptions: HotelOption[];
  confidenceScore: number;
  reasons: string[];
  bookingLinks: {
    flight: string;
    hotel: string;
  };
  createdAt: string;
}

export interface SearchFilters {
  budgetMin?: number;
  budgetMax?: number;
  departureDate?: string;
  returnDate?: string;
  duration?: number;
  travelType?: 'leisure' | 'business' | 'family';
  region?: string;
  climate?: string;
}

export interface AIPromptData {
  userPreferences: UserPreferences;
  searchFilters?: SearchFilters;
  availableDestinations: Destination[];
  travelHistory?: TripSuggestion[];
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// CSV Upload types
export interface CSVUploadResponse {
  id: string;
  filename: string;
  status: 'processing' | 'completed' | 'failed';
  recordsProcessed: number;
  errors?: string[];
}

// Webhook types
export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
}
