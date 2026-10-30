import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  ActiveTab,
  Departure,
  OperatorGroup,
  PassengerDetails,
  PricingArm,
  RedPassPack,
  Seat,
  Booking,
  LoyaltyReward,
  ViewMode,
} from '../types';
import {
  MOCK_OPERATORS_GROUPED,
  SAMPLE_ACTIVE_PASS,
  SAMPLE_UPCOMING_BOOKING,
} from '../data/mockData';

interface AppContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  isMobileView: boolean;

  // Search state
  source: string;
  setSource: (s: string) => void;
  destination: string;
  setDestination: (d: string) => void;
  travelDate: string;
  setTravelDate: (date: string) => void;
  operatorGroups: OperatorGroup[];

  // Active booking journey
  selectedDeparture: Departure | null;
  setSelectedDeparture: (dep: Departure | null) => void;
  selectedSeats: Seat[];
  toggleSeatSelection: (seat: Seat) => void;
  clearSeatSelection: () => void;
  bookingJourneyType: 'regular' | 'red_pass';
  setBookingJourneyType: (type: 'regular' | 'red_pass') => void;

  // Passenger & Payment
  passengerDetails: PassengerDetails;
  setPassengerDetails: React.Dispatch<React.SetStateAction<PassengerDetails>>;
  assuranceOpted: boolean;
  setAssuranceOpted: (val: boolean) => void;

  // Bookings list
  bookings: Booking[];
  currentBooking: Booking | null;
  confirmBooking: () => { success: boolean; message: string; booking?: Booking };

  // Red Pass
  activePass: RedPassPack | null;
  purchasePass: (type: 'standard' | 'student', studentData?: { college: string; roll: string }) => boolean;
  cancelPassRide: (bookingId: string) => { success: boolean; message: string };
  swapPassRide: (bookingId: string, newDepartureId: string, newSeat: Seat) => { success: boolean; message: string };
  cancelRegularTicket: (bookingId: string) => { success: boolean; message: string };

  // QR Boarding & Loyalty
  selectedBookingForQR: Booking | null;
  setSelectedBookingForQR: (b: Booking | null) => void;
  loyalty: LoyaltyReward;
  simulateConductorScan: (bookingId: string) => { success: boolean; message: string; voucherUnlocked?: boolean };

  // Student verification modal
  isStudentModalOpen: boolean;
  setIsStudentModalOpen: (val: boolean) => void;
  isStudentVerified: boolean;
  verifyStudent: (college: string, roll: string) => void;

  // Swap modal
  swapTargetBooking: Booking | null;
  setSwapTargetBooking: (b: Booking | null) => void;

  // Experiment controls
  pricingArm: PricingArm;
  setPricingArm: (arm: PricingArm) => void;
  getStandardPassPrice: () => number;
  getPerRidePrice: () => number;

  // Demo Controls & KPIs
  isDemoControlsOpen: boolean;
  setIsDemoControlsOpen: (open: boolean) => void;
  stats: {
    totalBookingsCount: number;
    passesPurchasedCount: number;
    passRidesRedeemedCount: number;
    scannedBoardingsCount: number;
    vouchersEarnedCount: number;
  };
  resetDemo: () => void;
  preloadDemoState: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'redbus_redpass_mvp_state_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & View
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [isDemoControlsOpen, setIsDemoControlsOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Search parameters
  const [source, setSource] = useState<string>('Warangal');
  const [destination, setDestination] = useState<string>('Hyderabad');
  const [travelDate, setTravelDate] = useState<string>('Tomorrow, 16 Nov');

  // Pricing Experiment ('standard_1200' | 'parity_1230' | 'student_1140')
  const [pricingArm, setPricingArm] = useState<PricingArm>('standard_1200');

  // Operators & Inventory
  const [operatorGroups, setOperatorGroups] = useState<OperatorGroup[]>(() => {
    return JSON.parse(JSON.stringify(MOCK_OPERATORS_GROUPED));
  });

  // Current Booking Flow State
  const [selectedDeparture, setSelectedDeparture] = useState<Departure | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookingJourneyType, setBookingJourneyType] = useState<'regular' | 'red_pass'>('regular');
  const [assuranceOpted, setAssuranceOpted] = useState<boolean>(true);
  const [passengerDetails, setPassengerDetails] = useState<PassengerDetails>({
    name: 'Sai Varun',
    gender: 'male',
    age: 24,
    email: 'varun.traveller@example.com',
    phone: '9876543210',
    whatsappAlerts: true,
    assuranceOpted: true,
  });

  // Completed / Active Bookings
  const [bookings, setBookings] = useState<Booking[]>([SAMPLE_UPCOMING_BOOKING]);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(SAMPLE_UPCOMING_BOOKING);

  // Red Pass State
  const [activePass, setActivePass] = useState<RedPassPack | null>(SAMPLE_ACTIVE_PASS);

  // Student verification
  const [isStudentModalOpen, setIsStudentModalOpen] = useState<boolean>(false);
  const [isStudentVerified, setIsStudentVerified] = useState<boolean>(false);

  // Swap modal
  const [swapTargetBooking, setSwapTargetBooking] = useState<Booking | null>(null);

  // QR & Loyalty
  const [selectedBookingForQR, setSelectedBookingForQR] = useState<Booking | null>(SAMPLE_UPCOMING_BOOKING);
  const [loyalty, setLoyalty] = useState<LoyaltyReward>({
    completedBoardings: 7,
    nextMilestone: 15,
    vouchers: [],
  });

  // Stats for Case Presentation
  const [stats, setStats] = useState({
    totalBookingsCount: 1,
    passesPurchasedCount: 1,
    passRidesRedeemedCount: 1,
    scannedBoardingsCount: 0,
    vouchersEarnedCount: 0,
  });

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activePass !== undefined) setActivePass(parsed.activePass);
        if (parsed.bookings) setBookings(parsed.bookings);
        if (parsed.loyalty) setLoyalty(parsed.loyalty);
        if (parsed.pricingArm) setPricingArm(parsed.pricingArm);
        if (parsed.stats) setStats(parsed.stats);
      }
    } catch {
      // Ignore parse error and keep clean state
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          activePass,
          bookings,
          loyalty,
          pricingArm,
          stats,
        })
      );
    } catch {
      // Ignore storage errors
    }
  }, [activePass, bookings, loyalty, pricingArm, stats]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'desktop' ? 'mobile_frame' : 'desktop'));
  };

  const getStandardPassPrice = () => {
    return pricingArm === 'parity_1230' ? 1230 : 1200;
  };

  const getPerRidePrice = () => {
    return pricingArm === 'parity_1230' ? 410 : 400;
  };

  // Seat toggle logic
  const toggleSeatSelection = (seat: Seat) => {
    if (!seat.isAvailable) {
      showToast(`Seat ${seat.seatNumber} is already occupied.`);
      return;
    }

    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seat.id);
      if (exists) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        // In Red Pass redemption, single ride is 1 seat
        if (bookingJourneyType === 'red_pass') {
          return [seat];
        }
        // In regular booking, allow selecting up to 4 seats
        if (prev.length >= 4) {
          showToast('Maximum 4 seats can be selected per booking.');
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const clearSeatSelection = () => {
    setSelectedSeats([]);
  };

  // Student verification handler
  const verifyStudent = (college: string, roll: string) => {
    setIsStudentVerified(true);
    setIsStudentModalOpen(false);
    showToast(`Student ID verified for ${college} (${roll})`);
  };

  // Purchase Red Pass
  const purchasePass = (type: 'standard' | 'student', studentData?: { college: string; roll: string }): boolean => {
    const price = type === 'student' ? 1140 : getStandardPassPrice();
    const effectiveRide = type === 'student' ? 380 : getPerRidePrice();

    const newPass: RedPassPack = {
      id: `RP-${Math.floor(10000 + Math.random() * 90000)}`,
      packType: type,
      totalRides: 3,
      remainingRides: 3,
      ridesUsed: 0,
      packPrice: price,
      effectivePerRide: effectiveRide,
      purchaseDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      expiryDate: '30 Days from today (Proposed)',
      routeCorridor: `${source} ⇄ ${destination}`,
      cancellationsUsed: 0,
      maxCancellations: 1,
      swapsUsed: 0,
      maxSwapsPerRide: 3,
      isVerifiedStudent: type === 'student',
      studentCollege: studentData?.college,
      studentIdNumber: studentData?.roll,
    };

    setActivePass(newPass);
    setStats((prev) => ({
      ...prev,
      passesPurchasedCount: prev.passesPurchasedCount + 1,
    }));

    // Trigger celebration
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    showToast(`Red Pass (${type === 'student' ? 'Campus Student' : 'Standard'}) activated! 3 rides ready.`);
    return true;
  };

  // Booking confirmation
  const confirmBooking = (): { success: boolean; message: string; booking?: Booking } => {
    if (!selectedDeparture || selectedSeats.length === 0) {
      return { success: false, message: 'Please select a departure and at least one seat.' };
    }

    if (!passengerDetails.name.trim() || !passengerDetails.phone.trim()) {
      return { success: false, message: 'Please provide passenger name and contact number.' };
    }

    const preferredFees = selectedSeats.reduce((acc, s) => acc + (s.preferredFee || 0), 0);
    const assuranceFee = assuranceOpted ? 16 : 0;
    const baseTicketTotal = selectedSeats.length * selectedDeparture.fare;

    let finalTotal = baseTicketTotal + preferredFees + assuranceFee;

    if (bookingJourneyType === 'red_pass') {
      if (!activePass || activePass.remainingRides <= 0) {
        return { success: false, message: 'No rides remaining on your active Red Pass.' };
      }
      // Base ticket is covered by the Red Pass ride! Only preferred seat fee or assurance applies
      finalTotal = preferredFees + assuranceFee;
    }

    const newBooking: Booking = {
      id: `BK-${Math.floor(10000 + Math.random() * 90000)}`,
      bookingRef: `RB-${selectedDeparture.source.slice(0, 3).toUpperCase()}-${selectedDeparture.destination.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      journeyType: bookingJourneyType,
      departureId: selectedDeparture.id,
      departure: selectedDeparture,
      selectedSeats: [...selectedSeats],
      passenger: { ...passengerDetails },
      totalFare: finalTotal,
      preferredSeatFee: preferredFees,
      bookingDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      travelDate: travelDate,
      status: 'confirmed',
      swapsCount: 0,
      qrVerified: false,
      qrCodeToken: `REDPASS-SECURE-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      redPassId: bookingJourneyType === 'red_pass' ? activePass?.id : undefined,
    };

    // Update Seat Inventory in Operator Groups to mark selected seats as occupied
    setOperatorGroups((prev) =>
      prev.map((group) => {
        if (group.operatorId !== selectedDeparture.operatorId) return group;
        return {
          ...group,
          departures: group.departures.map((dep) => {
            if (dep.id !== selectedDeparture.id) return dep;
            const updatedSeats = dep.seats.map((st) => {
              const wasBooked = selectedSeats.some((s) => s.id === st.id);
              if (wasBooked) {
                return { ...st, isAvailable: false, isJustFreed: false };
              }
              return st;
            });
            const remaining = updatedSeats.filter((s) => s.isAvailable).length;
            return {
              ...dep,
              seats: updatedSeats,
              availableSeatsCount: remaining,
            };
          }),
        };
      })
    );

    // If Red Pass was redeemed, debit 1 ride atomically
    if (bookingJourneyType === 'red_pass' && activePass) {
      setActivePass((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          remainingRides: Math.max(0, prev.remainingRides - 1),
          ridesUsed: prev.ridesUsed + 1,
        };
      });
      setStats((prev) => ({
        ...prev,
        passRidesRedeemedCount: prev.passRidesRedeemedCount + 1,
      }));
    }

    setBookings((prev) => [newBooking, ...prev]);
    setCurrentBooking(newBooking);
    setSelectedBookingForQR(newBooking);
    setStats((prev) => ({
      ...prev,
      totalBookingsCount: prev.totalBookingsCount + 1,
    }));

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });

    showToast(
      bookingJourneyType === 'red_pass'
        ? `Red Pass ride confirmed! 1 ride redeemed for ${selectedDeparture.operatorName} (${selectedSeats[0]?.seatNumber}).`
        : `Booking confirmed! PNR: ${newBooking.bookingRef}`
    );

    return { success: true, message: 'Booking confirmed!', booking: newBooking };
  };

  // Red Pass cancellation: 1-hour free window, re-credits ride to pass, marks seat as just freed
  const cancelPassRide = (bookingId: string): { success: boolean; message: string } => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    if (booking.status === 'cancelled') {
      return { success: false, message: 'This ride has already been cancelled.' };
    }

    if (booking.status === 'boarded') {
      return { success: false, message: 'Cannot cancel a completed/boarded ride.' };
    }

    if (activePass && activePass.cancellationsUsed >= activePass.maxCancellations) {
      return {
        success: false,
        message: `Maximum free cancellations (${activePass.maxCancellations}) already reached for this pass.`,
      };
    }

    // 1. Re-credit 1 ride to pass atomically
    if (activePass) {
      setActivePass((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          remainingRides: Math.min(prev.totalRides, prev.remainingRides + 1),
          ridesUsed: Math.max(0, prev.ridesUsed - 1),
          cancellationsUsed: prev.cancellationsUsed + 1,
        };
      });
    }

    // 2. Mark booking status as cancelled
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    // 3. Return the seat to inventory and flag as 'isJustFreed'
    setOperatorGroups((prev) =>
      prev.map((group) => {
        if (group.operatorId !== booking.departure.operatorId) return group;
        return {
          ...group,
          departures: group.departures.map((dep) => {
            if (dep.id !== booking.departure.id) return dep;
            const updatedSeats = dep.seats.map((st) => {
              const wasReleased = booking.selectedSeats.some((s) => s.id === st.id);
              if (wasReleased) {
                return { ...st, isAvailable: true, isJustFreed: true };
              }
              return st;
            });
            return {
              ...dep,
              seats: updatedSeats,
              availableSeatsCount: updatedSeats.filter((s) => s.isAvailable).length,
            };
          }),
        };
      })
    );

    showToast('Ride cancelled under Red Pass 1-hr free policy. 1 ride re-credited to your pass!');
    return { success: true, message: 'Ride cancelled and ride re-credited to pack.' };
  };

  // Regular ticket cancellation (standard 6-hour demo policy)
  const cancelRegularTicket = (bookingId: string): { success: boolean; message: string } => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    if (booking.status === 'cancelled') {
      return { success: false, message: 'Ticket already cancelled.' };
    }

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );

    // Release seat
    setOperatorGroups((prev) =>
      prev.map((group) => {
        if (group.operatorId !== booking.departure.operatorId) return group;
        return {
          ...group,
          departures: group.departures.map((dep) => {
            if (dep.id !== booking.departure.id) return dep;
            const updatedSeats = dep.seats.map((st) => {
              const wasReleased = booking.selectedSeats.some((s) => s.id === st.id);
              if (wasReleased) {
                return { ...st, isAvailable: true, isJustFreed: true };
              }
              return st;
            });
            return {
              ...dep,
              seats: updatedSeats,
              availableSeatsCount: updatedSeats.filter((s) => s.isAvailable).length,
            };
          }),
        };
      })
    );

    showToast('Regular ticket cancelled successfully as per 6-hr policy. Refund initiated.');
    return { success: true, message: 'Regular ticket cancelled.' };
  };

  // Flexible Bus Swap (Change Bus)
  const swapPassRide = (
    bookingId: string,
    newDepartureId: string,
    newSeat: Seat
  ): { success: boolean; message: string } => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    if (booking.swapsCount >= 3) {
      return { success: false, message: 'Maximum 3 bus swaps per ride reached under pilot rules.' };
    }

    // Find new departure
    let targetDep: Departure | null = null;
    for (const grp of operatorGroups) {
      const found = grp.departures.find((d) => d.id === newDepartureId);
      if (found) {
        targetDep = found;
        break;
      }
    }

    if (!targetDep) {
      return { success: false, message: 'Target departure not found.' };
    }

    // Atomic inventory update: Release old seat, occupy new seat
    setOperatorGroups((prev) =>
      prev.map((group) => ({
        ...group,
        departures: group.departures.map((dep) => {
          let updatedSeats = dep.seats;

          // If this is the old departure, free old seat
          if (dep.id === booking.departure.id) {
            updatedSeats = updatedSeats.map((s) => {
              if (booking.selectedSeats.some((oldS) => oldS.id === s.id)) {
                return { ...s, isAvailable: true, isJustFreed: true };
              }
              return s;
            });
          }

          // If this is the new departure, occupy new seat
          if (dep.id === targetDep?.id) {
            updatedSeats = updatedSeats.map((s) => {
              if (s.id === newSeat.id) {
                return { ...s, isAvailable: false, isJustFreed: false };
              }
              return s;
            });
          }

          return {
            ...dep,
            seats: updatedSeats,
            availableSeatsCount: updatedSeats.filter((s) => s.isAvailable).length,
          };
        }),
      }))
    );

    // Update booking object
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          departureId: targetDep!.id,
          departure: targetDep!,
          selectedSeats: [{ ...newSeat, isAvailable: false }],
          swapsCount: b.swapsCount + 1,
          status: 'swapped',
        };
      })
    );

    setSwapTargetBooking(null);
    showToast(`Bus changed successfully to ${targetDep.departureTime} departure (Seat ${newSeat.seatNumber}).`);
    return { success: true, message: 'Bus swapped successfully!' };
  };

  // Conductor Scan simulation & Loyalty
  const simulateConductorScan = (
    bookingId: string
  ): { success: boolean; message: string; voucherUnlocked?: boolean } => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false, message: 'Booking not found.' };

    if (booking.status === 'boarded' || booking.qrVerified) {
      return { success: false, message: 'This ride has already been boarded & scanned.' };
    }

    if (booking.status === 'cancelled') {
      return { success: false, message: 'Cannot scan a cancelled ticket.' };
    }

    // Mark as boarded and verified
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, status: 'boarded', qrVerified: true } : b
      )
    );

    // Update loyalty completed boardings
    let unlocked = false;
    setLoyalty((prev) => {
      const nextCount = prev.completedBoardings + 1;
      let vouchers = [...prev.vouchers];

      // ₹100 voucher after every 15 completed boardings
      if (nextCount > 0 && nextCount % 15 === 0) {
        unlocked = true;
        vouchers.push({
          id: `VCH-${Math.floor(1000 + Math.random() * 9000)}`,
          amount: 100,
          code: `REDPASS100-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          unlockedAt: new Date().toLocaleDateString('en-IN'),
          isUsed: false,
        });
      }

      return {
        ...prev,
        completedBoardings: nextCount,
        vouchers,
      };
    });

    setStats((prev) => ({
      ...prev,
      scannedBoardingsCount: prev.scannedBoardingsCount + 1,
      vouchersEarnedCount: unlocked ? prev.vouchersEarnedCount + 1 : prev.vouchersEarnedCount,
    }));

    if (unlocked) {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
      showToast('🎉 Milestone reached! ₹100 Red Pass loyalty voucher unlocked!');
    } else {
      showToast(`Conductor verified QR boarding! Seat ${booking.selectedSeats[0]?.seatNumber} validated.`);
    }

    return { success: true, message: 'Boarding verified successfully', voucherUnlocked: unlocked };
  };

  // Reset entire demo to clean state
  const resetDemo = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setActivePass(null);
    setBookings([]);
    setCurrentBooking(null);
    setSelectedBookingForQR(null);
    setSelectedSeats([]);
    setSelectedDeparture(null);
    setLoyalty({
      completedBoardings: 0,
      nextMilestone: 15,
      vouchers: [],
    });
    setStats({
      totalBookingsCount: 0,
      passesPurchasedCount: 0,
      passRidesRedeemedCount: 0,
      scannedBoardingsCount: 0,
      vouchersEarnedCount: 0,
    });
    setOperatorGroups(JSON.parse(JSON.stringify(MOCK_OPERATORS_GROUPED)));
    setActiveTab('home');
    showToast('Demo reset to clean state. Ready for fresh presentation!');
  };

  // Preload demo state with active pass and booked ride for immediate presentation
  const preloadDemoState = () => {
    setActivePass(JSON.parse(JSON.stringify(SAMPLE_ACTIVE_PASS)));
    setBookings([JSON.parse(JSON.stringify(SAMPLE_UPCOMING_BOOKING))]);
    setCurrentBooking(JSON.parse(JSON.stringify(SAMPLE_UPCOMING_BOOKING)));
    setSelectedBookingForQR(JSON.parse(JSON.stringify(SAMPLE_UPCOMING_BOOKING)));
    setLoyalty({
      completedBoardings: 7,
      nextMilestone: 15,
      vouchers: [],
    });
    setStats({
      totalBookingsCount: 1,
      passesPurchasedCount: 1,
      passRidesRedeemedCount: 1,
      scannedBoardingsCount: 0,
      vouchersEarnedCount: 0,
    });
    showToast('Sample Red Pass (2 rides left) & upcoming booking preloaded!');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        toggleViewMode,
        isMobileView: viewMode === 'mobile_frame',

        source,
        setSource,
        destination,
        setDestination,
        travelDate,
        setTravelDate,
        operatorGroups,

        selectedDeparture,
        setSelectedDeparture,
        selectedSeats,
        toggleSeatSelection,
        clearSeatSelection,
        bookingJourneyType,
        setBookingJourneyType,

        passengerDetails,
        setPassengerDetails,
        assuranceOpted,
        setAssuranceOpted,

        bookings,
        currentBooking,
        confirmBooking,

        activePass,
        purchasePass,
        cancelPassRide,
        swapPassRide,
        cancelRegularTicket,

        selectedBookingForQR,
        setSelectedBookingForQR,
        loyalty,
        simulateConductorScan,

        isStudentModalOpen,
        setIsStudentModalOpen,
        isStudentVerified,
        verifyStudent,

        swapTargetBooking,
        setSwapTargetBooking,

        pricingArm,
        setPricingArm,
        getStandardPassPrice,
        getPerRidePrice,

        isDemoControlsOpen,
        setIsDemoControlsOpen,
        stats,
        resetDemo,
        preloadDemoState,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
