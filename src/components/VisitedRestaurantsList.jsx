import VisitedRestaurant from './VisitedRestaurant';


export default function VisitedRestaurantsList({ visited, onDeleteVisitedRestaurant }) {
  return (
    <ul className="list">
      {visited.map((restaurant) => (
        <VisitedRestaurant 
          key={restaurant.id}
          restaurant={restaurant} 
          onDeleteVisitedRestaurant={onDeleteVisitedRestaurant}
        />
      ))}
    </ul>
  );
}