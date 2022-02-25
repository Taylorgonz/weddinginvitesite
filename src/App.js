
import {useState, useEffect} from 'react';
import './App.css';
import {db} from "./firebase"
import { collection, getDocs } from "firebase/firestore";



function App() {
  const [guest, setGuests]= useState([]);
  const guestRef = collection(db, "guests");


  useEffect(() => {
    const getGuests = async () => {
      const data = await getDocs(guestRef);
      console.log(data);
    }
    

    getGuests();
  }, [])

  return (
    <div className="App">
      <h1>Welcome To My Wedding Site!</h1>
    </div>
  );
}

export default App;
