import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import StarRating from './components/StarRating.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <StarRating messages={['Terrible', 'Bad', 'Ok', 'Good', 'Amazing']} /> */}
  </StrictMode>,
)
