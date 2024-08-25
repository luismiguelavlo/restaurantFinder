

export default function VisitedRestaurant({ restaurant, onDeleteVisitedRestaurant }) {
  return (
    <li>
      <img src={restaurant.image} alt={`${restaurant.name} image`} />
      <h3>{restaurant.name}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{restaurant.rating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{restaurant.userRating}</span>
        </p>

        <button className='btn-delete' onClick={() => onDeleteVisitedRestaurant(restaurant.id)}>X</button>
      </div>
    </li>
  );
}