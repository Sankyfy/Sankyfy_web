import logo from './logo.svg';
import './App.css';
import { AllRoutes } from './Components/Routes/AllRoutes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect } from 'react';
import { Base_Url } from './Configs/BaseUrl';
import axios from 'axios';
function App() {
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          localStorage.setItem("lat",latitude);
          localStorage.setItem("lng",longitude);
        },
        (err) => {
          console.log("Error of location",err)
        }
      );
    } else {
      console.log("Error of location")
    }
  };

  const incrementView = async () => {
    try {
      const response = await axios.get(`${Base_Url}api/views/increment`);
      return response.data;
    } catch (error) {
      console.error('Error incrementing view:', error);
    }
  };

  useEffect(()=>{
    getLocation();
    incrementView();
  },[])

  return (
    <div className="App">
      <AllRoutes />
    </div>
  );
}

export default App;
