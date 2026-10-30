export type BusClass = 'AC Seater' | 'AC Sleeper' | 'Non-AC Seater' | 'Volvo Multi-Axle';

export interface Seat {
  id: string;
  seatNumber: string;
  row: number;
  col: number; // 0, 1 (left of aisle), 2 (aisle), 3, 4 (right of aisle)
  deck: 'lower' | 'upper';
  type: 'seater' | 'sleeper';
  isAvailable: boolean;
  isSelected?: boolean;
  isWomenOnly?: boolean;
  isPreferred?: boolean; // front row or extra legroom
  preferredFee?: number; // e.g. 20
  isJustFreed?: boolean; // recently released inventory
}

export interface Departure {
  id: string;
  operatorId: string;
  operatorName: string;
  busClass: BusClass;
  source: string;
  destination: string;
  departureTime: string; // e.g. "06:00 PM"
  arrivalTime: string;   // e.g. "09:15 PM"
  duration: string;      // e.g. "3h 15m"
  boardingPoint: string;
  dropPoint: string;
  fare: number;          // regular operator-set fare e.g. 410
  availableSeatsCount: number;
  isRedPassEligible: boolean;
  isXpress?: boolean;
  rating: number;
  reviewsCount: number;
  seats: Seat[];
}

export interface OperatorGroup {
  operatorId: string;
  operatorName: string;
  busClass: BusClass;
  baseFare: number;
  frequencyText: string; // e.g. "Every 60 mins"
  rating: number;
  reviewsCount: number;
  amenities: string[];
  isRedPassEligible: boolean;
  departures: Departure[];
}

export interface RedPassPack {
  id: string;
  packType: 'standard' | 'student';
  totalRides: number;
  remainingRides: number;
  ridesUsed: number;
  packPrice: number;     // 1200, 1230, or 1140
  effectivePerRide: number;
  purchaseDate: string;
  expiryDate: string;
  routeCorridor: string; // "Warangal ⇄ Hyderabad"
  cancellationsUsed: number;
  maxCancellations: number;
  swapsUsed: number;
  maxSwapsPerRide: number;
  isVerifiedStudent?: boolean;
  studentCollege?: string;
  studentIdNumber?: string;
}

export interface PassengerDetails {
  name: string;
  gender: 'male' | 'female';
  age: number;
  email: string;
  phone: string;
  whatsappAlerts: boolean;
  assuranceOpted: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  journeyType: 'regular' | 'red_pass';
  departureId: string;
  departure: Departure;
  selectedSeats: Seat[];
  passenger: PassengerDetails;
  totalFare: number;
  preferredSeatFee: number;
  bookingDate: string;
  travelDate: string;
  status: 'confirmed' | 'boarded' | 'cancelled' | 'swapped';
  swapsCount: number;
  qrVerified: boolean;
  qrCodeToken: string;
  redPassId?: string;
}

export interface LoyaltyReward {
  completedBoardings: number;
  nextMilestone: number; // 15
  vouchers: {
    id: string;
    amount: number;
    code: string;
    unlockedAt: string;
    isUsed: boolean;
  }[];
}

export type PricingArm = 'standard_1200' | 'parity_1230' | 'student_1140';
export type ActiveTab = 'home' | 'search' | 'seat-select' | 'passenger' | 'payment' | 'confirmation' | 'red-pass-explore' | 'red-pass-checkout' | 'wallet' | 'manage-bookings' | 'account';
export type ViewMode = 'desktop' | 'mobile_frame';
