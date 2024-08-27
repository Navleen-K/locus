import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../Image.jsx";
import GuideBookingWidget from "../GuideBookingWidget.jsx"; // Adjust path as necessary

export default function GuideDetailPage() {
  const { id } = useParams();
  const [guide, setGuide] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`http://localhost:4000/api/guides/${id}`)
      .then(response => {
        setGuide(response.data);
        setError(null); // Clear any previous error
      })
      .catch(err => {
        setError(err.message);
        setGuide(null); // Clear any previous data
      });
  }, [id]);

  if (error) {
    return <div className="mt-4 text-red-500">Error: {error}</div>;
  }

  if (!guide) {
    return <div className="mt-4">Loading...</div>;
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{guide.name}</h1>
      <div className="flex mb-4">
        <Image className="rounded-2xl object-cover w-48 h-48" src={guide.profilePhoto} alt={guide.name} />
      </div>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Languages Spoken</h2>
            {guide.languages.join(', ')}
          </div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Places Covered</h2>
            {guide.places.join(', ')}
          </div>
          <p>Contact: {guide.contact}</p>
          <p>Email: {guide.email}</p>
        </div>
        <div>
          <GuideBookingWidget guide={guide} />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">ID Proof</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
          <img src={guide.idProof} alt="ID Proof" className="w-full rounded" />
        </div>
      </div>
    </div>
  );
}
