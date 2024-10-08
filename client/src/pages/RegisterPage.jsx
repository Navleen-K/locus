import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import {URL} from "../../config.js";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User'); // New state for role

  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post(
        `${URL}/api/register`,
        { name, email, password, role }, // data object
        { withCredentials: true } // config object
      );
      alert('Registration successful. Now you can log in');
    } catch (e) {
      console.error('Registration failed:', e.response?.data || e.message);
      alert('Registration failed. Please try again later');
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={ev => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="primary mt-4">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
