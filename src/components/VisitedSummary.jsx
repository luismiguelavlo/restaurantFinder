
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function VisitedSummary({ visited }) {
  const avgRating = average(visited.map((restaurant) => restaurant.rating));
  const avgUserRating = average(visited.map((restaurant) => restaurant.userRating));

  return (
    <div className="summary">
      <h2>Restaurants you visited</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{visited.length} restaurants</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
      </div>
    </div>
  );
}