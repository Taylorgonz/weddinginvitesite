
import {useState, useEffect} from 'react';
import './App.css';
import {db} from "./firebase"
import { collection, getDocs } from "firebase/firestore";
import stamp from "./photos/stamp.png";



function App() {
  const [guests, setGuests]= useState([]);
  const guestRef = collection(db, "guests");


  useEffect(() => {
    const getGuests = async () => {
      const data = await getDocs(guestRef);
      setGuests(data.docs.map((doc)=> ({...doc.data(), id: doc.id})))
    }
    

    getGuests();
  }, [])
  console.log(guests)

  return (

    <div className="App">
      <div className="header">
        <img className="stamp" src={stamp}/>
      </div>
      <div className="mainCont">
      <div className="imageCont">
        <h1 className="imageTitle">
        CELEBRATE WITH US!
        </h1>
        <p>Join us for free beer, food, fun and help us celebrate our love together!</p>
      </div>
      <div className="infoCont">

      </div>
      </div>
      
    </div>
  );
}

export default App;
