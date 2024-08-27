import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function GuideProfilePage() {
  const [guide, setGuide] = useState(null);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [idProof, setIdProof] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [languages, setLanguages] = useState('');
  const [places, setPlaces] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGuide() {
      const userEmail = localStorage.getItem('UserEmail'); // Get the email from localStorage

      if (!userEmail) {
        console.error('Email not found in localStorage');
        return;
      }

      try {
        // Fetch guide profile
        const { data } = await axios.get('http://localhost:4000/api/guide-profile', {
          params: { email: userEmail } // Pass the email as a query parameter
        });

        setGuide(data);
        setName(data.name);
        setContact(data.contact);
        setEmail(data.email);
        setLanguages(data.languages.join(', '));
        setPlaces(data.places.join(', '));

        // Fetch bookings related to the guide
        const bookingsResponse = await axios.get(`http://localhost:4000/api/guide-bookings/${data._id}`);
        setBookings(bookingsResponse.data); // Assuming bookingsResponse.data is an array of bookings
      } catch (e) {
        console.error('Failed to fetch guide data', e);
        setError('Failed to fetch guide data.');
      } finally {
        setLoadingBookings(false);
      }
    }

    fetchGuide();
  }, []);

  async function handleUpdateSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('contact', contact);
    formData.append('email', email);
    formData.append('idProof', idProof);
    formData.append('profilePhoto', profilePhoto);
    formData.append('languages', languages);
    formData.append('places', places);

    try {
      await axios.post('http://localhost:4000/api/update-guide', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Update successful');
      setRedirect(true);
    } catch (e) {
      alert('Update failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (!guide) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Guide Profile</h1>
        <div className="text-center">
          <img src={guide.profilePhoto} alt="Profile" className="rounded-full w-32 h-32 mx-auto mb-4" />
        </div>
        <form className="max-w-md mx-auto" onSubmit={handleUpdateSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Contact info"
            value={contact}
            onChange={ev => setContact(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          Update your ID-proof: <input
            type="file"
            onChange={ev => setIdProof(ev.target.files[0])}
          />
          <br />
          Update profile photo: <input
            type="file"
            onChange={ev => setProfilePhoto(ev.target.files[0])}
          />
          <input
            type="text"
            placeholder="Languages you know (comma separated)"
            value={languages}
            onChange={ev => setLanguages(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Places you can introduce (comma separated)"
            value={places}
            onChange={ev => setPlaces(ev.target.value)}
          />
          <button className="primary">Update</button>
        </form>

        <div className="mt-8">
          <h2 className="text-2xl text-center mb-4">Booking Details</h2>
          {loadingBookings ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookings.length === 0 ? (
            <p>No bookings found.</p>
          ) : (
            <ul>
              {bookings.map(booking => (
                <li key={booking._id} className="border p-4 mb-4 rounded-lg">
                  <p><strong>Booking ID:</strong> {booking._id}</p>
                  <p><strong>User Name:</strong> {booking.name}</p>
                  <p><strong>User Phone:</strong> {booking.phone}</p>
                  <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
