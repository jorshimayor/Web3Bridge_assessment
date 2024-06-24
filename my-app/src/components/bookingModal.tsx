'use client'
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBook: (hours: number, membership: 'Basic' | 'Premium' | 'Executive' | 'None') => void;
  deskType: 'individual' | 'team';
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onBook, deskType }) => {
  const [hours, setHours] = useState(1);
  const [membership, setMembership] = useState<'Basic' | 'Premium' | 'Executive' | 'None'>('None');

  const handleBooking = () => {
    onBook(hours, membership);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl mb-4">Book Desk</h2>
        <div className="mb-4">
          <label className="block mb-2">Hours:</label>
          <input
            type="number"
            value={hours}
            min="1"
            onChange={(e) => setHours(parseInt(e.target.value))}
            className="border p-2 w-full"
          />
        </div>
        {deskType === 'individual' && (
          <div className="mb-4">
            <label className="block mb-2">Membership:</label>
            <select
              value={membership}
              onChange={(e) => setMembership(e.target.value as 'Basic' | 'Premium' | 'Executive' | 'None')}
              className="border p-2 w-full"
            >
              <option value="None">None</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Executive">Executive</option>
            </select>
          </div>
        )}
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={handleBooking} className="px-4 py-2 bg-blue-500 text-white rounded">Book</button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
