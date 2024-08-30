import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {URL} from "../../config.js";

export default function BookingDetailsPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [guide, setGuide] = useState(null);  // New state for guide details
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBooking() {
      try {
        const response = await axios.get(`${URL}/api/book-guide/${bookingId}`);
        const bookingData = response.data;
        setBooking(bookingData);

        // Fetch guide details
        if (bookingData.guide && bookingData.guide._id) {
          const guideResponse = await axios.get(`${URL}/api/guides/${bookingData.guide._id}`);
          setGuide(guideResponse.data);
        }
      } catch (err) {
        setError('Failed to fetch booking details.');
      } finally {
        setLoading(false);
      }
    }

    fetchBooking();
  }, [bookingId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Booking Details
      </div>
      <div className="border rounded-2xl mt-4 p-4">
        <p><strong>Guide Name:</strong> {guide ? guide.name : 'Loading...'}</p>
        <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
        <p><strong>Full Name:</strong> {booking.name}</p>
        <p><strong>Phone Number:</strong> {booking.phone}</p>
        <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
