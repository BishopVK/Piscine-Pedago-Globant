export default function PhotoGrid({ photos }: { photos: any[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.urls.small}
          alt={photo.alt_description}
          className="rounded shadow"
        />
      ))}
    </div>
  );
}
