

export default function Restaurant({ restaurant, onSelectRestaurant }) {
  return (
    <li onClick={() => onSelectRestaurant(restaurant.id)}>
      <img src={restaurant.image} alt={`${restaurant.name} image`} />
      <h3>{restaurant.name}</h3>
      <div>
        <p>
          <span>📍</span>
          <span>{restaurant.location}</span>
        </p>
      </div>
    </li>
  );
}