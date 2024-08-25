

export default function NumResults({ restaurants }) {
  return (
    <p className="num-results">
      Found <strong>{restaurants.length}</strong> results
    </p>
  );
}