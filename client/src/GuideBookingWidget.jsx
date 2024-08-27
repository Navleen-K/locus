import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../src/UserContext";

export default function GuideBookingWidget({ guide }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [redirect, setRedirect] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  async function bookThisGuide() {
    try {
      const response = await axios.post('http://localhost:4000/api/book-guide', {
        guideId: guide._id,
        bookingDetails: {
          startDate,
          endDate,
          name,
          phone,
        },
        bookingDate: new Date().toISOString(),  // Include the current date as bookingDate
      });
      const bookingId = response.data._id;
      setRedirect(`/account/book-guide/${bookingId}`);
    } catch (error) {
      console.error('Booking error:', error.response ? error.response.data : error.message);
    }
  }
  
  
  

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Book {guide.name}
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="py-3 px-4">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={ev => setStartDate(ev.target.value)} />
        </div>
        <div className="py-3 px-4 border-t">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={ev => setEndDate(ev.target.value)} />
        </div>
        <div className="py-3 px-4 border-t">
          <label>Your full name:</label>
          <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
          <label>Phone number:</label>
          <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
        </div>
      </div>
      <button onClick={bookThisGuide} className="primary mt-4">
        Book this guide
      </button>
    </div>
  );
}
