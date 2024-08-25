import { useEffect, useState } from 'react'
import StarRating from './StarRating';
import { Loader } from './Loader';


export const RestaurantDetail = ({ selectedId, onCloseRestaurant, onAddVisitedRestaurant, visited }) => {
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');

  const { name, image, location, description, rating, menu } = restaurant;

  const isVisited = visited.map(restaurant => restaurant.id).includes(selectedId);

  const visitedUserRating = visited.find(restaurant => restaurant.id === selectedId)?.userRating;

  useEffect(() => {
    async function getRestaurantDetails () {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/restaurants/${selectedId}`);
      const data = await response.json();
      console.log(data);
      setRestaurant(data);
      setIsLoading(false);
    }
    getRestaurantDetails()
  }, [selectedId])

  function handleAdd(){
    const newVisitedRestaurant = {
      id: selectedId,
      name,
      location,
      image,
      rating: +rating,
      userRating: +userRating,
    }

    onAddVisitedRestaurant(newVisitedRestaurant);
    onCloseRestaurant();
  }

  useEffect(() => {
    document.title = `Restaurant | ${name}`;

    return () => {
      document.title = 'RestaurantFinder'
    }
  }, [name])
  
  useEffect(() => {
    const cb = (e) => {
      if(e.code === 'Escape'){
        onCloseRestaurant();
        console.log('ESCAPE')
      };
    }
    
    document.addEventListener('keydown', cb);
    
    return () => document.removeEventListener('keydown', cb);
  }, [])


  return (
    <div className='details'>
      {
        isLoading ? <Loader /> : (
          <>
            <header>
              <button className='btn-back' onClick={onCloseRestaurant}>&larr;</button>
              <img src={image} alt={name} />
              <div className='details-overview'>
                <h2>{name}</h2>
                <p>{location}</p>
                <p><span>⭐</span>{rating}</p>
              </div>
            </header>
            <section>
              <div className="rating">
                {
                  !isVisited ? (
                    <>
                      <StarRating
                        maxRating={10}
                        size={24}
                        onSetRating={setUserRating}
                      />
                      {
                        userRating > 0 && (
                          <button className='btn-add' onClick={handleAdd}>+ Add to list</button>
                        )
                      }
                    </>
                  ) : (
                    <p>You rated this restaurant {visitedUserRating}</p>
                  )
                }
                
              </div>
              <p>{description}</p>
              <h2 style={{ textAlign: 'center' }}>📄Menú📄</h2>
              <ul>
                {menu?.map((item) => (
                  <li key={item.name}>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )
      }

    </div>
  )
}