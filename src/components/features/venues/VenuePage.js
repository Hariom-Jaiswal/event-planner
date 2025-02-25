import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function VenuePage() {
  const { userRole } = useAuth();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data - will be replaced with Firebase data
  const venues = [
    {
      id: 1,
      name: 'Main Auditorium',
      capacity: 500,
      facilities: ['Stage', 'Sound System', 'Projector', 'Air Conditioning'],
      bookings: [
        {
          id: 1,
          date: '2024-03-25',
          department: 'Technical',
          event: 'Technical Workshop',
          timeSlot: '09:00-12:00',
          status: 'approved'
        },
        {
          id: 2,
          date: '2024-03-25',
          department: 'Cultural',
          event: 'Dance Practice',
          timeSlot: '14:00-17:00',
          status: 'pending'
        }
      ]
    },
    {
      id: 2,
      name: 'Seminar Hall',
      capacity: 200,
      facilities: ['Projector', 'Air Conditioning', 'Audio System'],
      bookings: [
        {
          id: 3,
          date: '2024-03-26',
          department: 'Sports',
          event: 'Team Meeting',
          timeSlot: '10:00-11:00',
          status: 'approved'
        }
      ]
    }
  ];

  const timeSlots = [
    '09:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
    '17:00-18:00'
  ];

  const BookingForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Book Venue</h3>
          <button
            onClick={() => setShowBookingForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Slot</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              {timeSlots.map(slot => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purpose</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Book Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const VenueCard = ({ venue }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{venue.name}</h2>
            <p className="text-sm text-gray-500">Capacity: {venue.capacity} people</p>
          </div>
          <button
            onClick={() => {
              setSelectedVenue(venue);
              setShowBookingForm(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Book Now
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Facilities</h3>
          <div className="flex flex-wrap gap-2">
            {venue.facilities.map(facility => (
              <span
                key={facility}
                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
              >
                {facility}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Today's Schedule</h3>
          <div className="space-y-2">
            {venue.bookings
              .filter(booking => booking.date === selectedDate)
              .map(booking => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.event}</p>
                    <p className="text-xs text-gray-500">{booking.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-900">{booking.timeSlot}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      booking.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Available time slots
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {timeSlots.map(slot => {
            const isBooked = venue.bookings.some(
              booking => booking.date === selectedDate && booking.timeSlot === slot
            );
            return (
              <div
                key={slot}
                className={`text-xs p-2 rounded-md text-center ${
                  isBooked
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {slot}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Venues</h1>
        <p className="text-gray-500">View and book available venues</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {venues.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>

      {showBookingForm && <BookingForm />}
    </div>
  );
} 