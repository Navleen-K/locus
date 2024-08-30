import {useContext, useState, useEffect} from "react";
import {UserContext} from "../UserContext.jsx";
import {Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import {URL} from "../../config.js";

export default function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  const [isGuide, setIsGuide] = useState(true);

  async function fetchGuideProfile() {
    const userEmail = localStorage.getItem('UserEmail'); // Get the email from localStorage

    if (!userEmail) {
      console.error('Email not found in localStorage');
      return;
    }

    try {
      const response = await axios.get(`${URL}/api/guide-profile`, {
        params: { email: userEmail }, // Pass the email as a query parameter
      });

      if (response.data) {
        setIsGuide(false);
        // Handle the guide profile data as needed
      } else {
        console.error('Guide profile not found');
        setIsGuide(true);
      }
    } catch (e) {
      console.error('Error fetching guide profile:', e);
    }
  }

  useEffect(() => {
    fetchGuideProfile();
  }, []);
  

  async function logout() {
    await axios.post(`${URL}/api/logout`);
    localStorage.removeItem('UserEmail');
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  function handleBecomeGuide() {
    setRedirect('/guide-reg');
  }

  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          {isGuide && (<Link  to={'/account/guideRegister'}><button className="primary max-w-sm mt-2">Become a Guide</button></Link>)}
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}
