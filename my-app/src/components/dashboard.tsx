"use client"
import { useState } from 'react';
interface Booking {
  id: number;
  type: 'individual' | 'team';
  hours: number;
  membership: 'Basic' | 'Premium' | 'Executive' | 'None';
}

interface DashboardProps {
  bookings: Booking[];
}

const Dashboard: React.FC<DashboardProps> = ({ bookings }) => {
  const calculateRevenue = (membership: 'Basic' | 'Premium' | 'Executive' | 'None') => {
    const rates = { Basic: 10, Premium: 15, Executive: 20, None: 15 };
    return bookings
      .filter((booking) => booking.membership === membership)
      .reduce((total, booking) => {
        const rate = booking.type === 'team' ? 25 : rates[booking.membership];
        const discount = booking.hours > 3 ? 0.9 : 1;
        return total + rate * booking.hours * discount;
      }, 0);
  };

  return (
    <div className="p-4 border rounded mt-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 border rounded">
          <h3 className="text-xl">Basic</h3>
          <p>${calculateRevenue('Basic').toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-xl">Premium</h3>
          <p>${calculateRevenue('Premium').toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-xl">Executive</h3>
          <p>${calculateRevenue('Executive').toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded">
          <h3 className="text-xl">None</h3>
          <p>${calculateRevenue('None').toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
