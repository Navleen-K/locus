import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Image from '../Image.jsx';
import {URL} from "../../config.js";

export default function GuidesPage() {
  const [guides, setGuides] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/api/guides`).then(response => {
      setGuides(response.data);
    });
  }, []);

  return (
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {guides.length > 0 && guides.map(guide => (
        <Link key={guide._id} to={'/guide/' + guide._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {guide.profilePhoto && (
              <Image className="rounded-2xl object-cover aspect-square" src={guide.profilePhoto} alt={guide.name} />
            )}
          </div>
          <h2 className="font-bold">{guide.name}</h2>
          <h3 className="text-sm text-gray-500">Languages: {guide.languages.join(', ')}</h3>
          <div className="mt-1">
            <span className="font-bold">Contact:</span> {guide.contact}
          </div>
        </Link>
      ))}
    </div>
  );
}
