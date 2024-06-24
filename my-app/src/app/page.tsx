"use client"

import { useState } from 'react';
import Desk from '@/components/desk';
import BookingModal from '@/components/bookingModal';
import Dashboard from '@/components/dashboard';

interface Booking {
  id: number;
  type: 'individual' | 'team';
  hours: number;
  membership: 'Basic' | 'Premium' | 'Executive' | 'None';
}

const Home: React.FC = () => {
  const [desks, setDesks] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      type: i < 10 ? 'individual' : 'team',
      isBooked: false,
    }))
  );

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDesk, setSelectedDesk] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: number) => {
    setSelectedDesk(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDesk(null);
    setIsModalOpen(false);
  };

  const handleBooking = (hours: number, membership: 'Basic' | 'Premium' | 'Executive' | 'None') => {
    if (selectedDesk === null) return;

    const updatedDesks = desks.map((desk) =>
      desk.id === selectedDesk ? { ...desk, isBooked: !desk.isBooked } : desk
    );
    setDesks(updatedDesks);

    const desk = desks.find((desk) => desk.id === selectedDesk);
    if (desk) {
      const newBooking: Booking = { id: selectedDesk, type: desk.type as 'individual' | 'team', hours, membership };
      setBookings([...bookings, newBooking]);
    }
  };

  const totalRevenue = bookings.reduce((acc, booking) => {
    const rates = { Basic: 10, Premium: 15, Executive: 20, None: 15 };
    const rate = booking.type === 'team' ? 25 : rates[booking.membership];
    const discount = booking.hours > 3 ? 0.9 : 1;
    return acc + rate * booking.hours * discount;
  }, 0);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center my-8">Co-working Space Booking System</h1>
      <div className="grid grid-cols-3 gap-4">
        {desks.map((desk) => (
          <Desk key={desk.id} {...desk} onClick={() => openModal(desk.id)} type={desk.type as 'individual' | 'team'} />
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl">Total Revenue: ${totalRevenue.toFixed(2)}</h2>
      </div>
      <div className='my-5'>
        <Dashboard bookings={bookings} />
        <BookingModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onBook={(hours, membership) => handleBooking(hours, membership)}
          deskType={selectedDesk !== null ? (desks[selectedDesk - 1].type as 'individual' | 'team') : 'individual'}
        />
      </div>
    </div>
  );
};

export default Home;
