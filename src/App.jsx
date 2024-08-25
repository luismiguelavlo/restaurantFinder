import { useEffect, useState } from "react";
import NavBar from './components/Navbar';
import RestaurantList from './components/RestaurantList';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import VisitedSummary from './components/VisitedSummary';
import VisitedRestaurantsList from './components/VisitedRestaurantsList';
import { Loader } from './components/Loader';
import { Error } from './components/Error';
import { RestaurantDetail } from './components/RestaurantDetail';

// const tempRestaurantData = [
//   {
//     id: "r1",
//     name: "Inception Restaurant",
//     location: "New York",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     id: "r2",
//     name: "The Matrix Diner",
//     location: "Los Angeles",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     id: "r3",
//     name: "Parasite Eatery",
//     location: "Seoul",
//     image:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
// ];

const tempVisitedData = [
  {
    id: "r1",
    name: "Inception Restaurant",
    location: "New York",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    rating: 4.5,
    userRating: 5,
  },
  {
    id: "r4",
    name: "Back to the Future Café",
    location: "Chicago",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    rating: 4.8,
    userRating: 4.5,
  },
];



export default function App() {
  const [ restaurants, setRestaurants] = useState([]);
  const [ visited, setVisited] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true); 
  const [ hasError, setHasError ] = useState(false);
  const [ query, setQuery ] = useState("");
  const [ selectedId, setSelectedId ] = useState(null);

  function handleSelectRestaurant(id) {
    setSelectedId(id);
  }

  function handleCloseRestaurant() {
    setSelectedId(null);
  }

  function handleAddVisitedRestaurant(restaurant){
    setVisited(visited => [...visited, restaurant]);
  }

  function handleDeleteVisitedRestaurant(id){
    setVisited(visited => visited.filter(restaurant => restaurant.id !== id));
  }

  useEffect(() => {
    const controller = new AbortController();
    setHasError(false);
    setIsLoading(true);
    fetch(`http://localhost:3000/restaurants/?name=${query}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setHasError(false);
        return setRestaurants(data)
      })
      .catch((err) => {
        if( err.name !== 'AbortError' ){
          setHasError(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      })

      handleCloseRestaurant();

      return () => controller.abort();
  }, [query])
  

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults restaurants={restaurants} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {restaurants && !hasError && <RestaurantList restaurants={restaurants} onSelectRestaurant={handleSelectRestaurant} />}
          {hasError || restaurants.length === 0 && <Error />}
        </Box>

        <Box>
          {
            selectedId ? <RestaurantDetail 
              selectedId={selectedId} 
              onCloseRestaurant={handleCloseRestaurant} 
              onAddVisitedRestaurant={handleAddVisitedRestaurant}
              visited={visited}
            />
            : (
              <>
                <VisitedSummary visited={visited} />
                <VisitedRestaurantsList visited={visited} onDeleteVisitedRestaurant={handleDeleteVisitedRestaurant} />
              </>
            )
          }
          {/* <VisitedSummary visited={visited} />
          <VisitedRestaurantsList visited={visited} /> */}
        </Box>
      </Main>
    </>
  );
}
















