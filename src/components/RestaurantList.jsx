import Restaurant from './Restaurant';

export default function RestaurantList({ restaurants, onSelectRestaurant, onCloseRestaurant }) {
  return (
    <ul className="list list-restaurant">
      {restaurants?.map((restaurant) => (
        <Restaurant restaurant={restaurant} key={restaurant.id} onSelectRestaurant={onSelectRestaurant} />
      ))}
    </ul>
  );
}