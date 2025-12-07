import { useEffect, useState } from "react";

export default function Favorites() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favs") || "[]");
    setPhotos(favs);
  }, []);

  return (
    <div className="p-4">
      {photos.length === 0 && <p>No favorites yet.</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((p: any) => (
          <img key={p.id} src={p.urls.small} className="rounded shadow" />
        ))}
      </div>
    </div>
  );
}
