
import { useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase"
import { collection, getDocs, addDoc } from "firebase/firestore";
import stamp from "./photos/stamp.png";



function App() {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState("")
  const [email, setEmail] = useState("")
  const [attending, setAttending] = useState("")
  const [formComplete, setFormComplete] = useState(false);

  const guestRef = collection(db, "guests");

  console.log(newGuest, email, attending, formComplete)

  const createGuest = async () => {
    await addDoc(guestRef, { name: newGuest, email: email, attending: attending });
    document.getElementById("rsvpForm").reset()
  }

  const checkForm = () => {
    if (email != "" && newGuest != "" && attending != "") {
      setFormComplete(true);
    }
    else {
      setFormComplete(false);
    }
  }

  useEffect(() => {
    const getGuests = async () => {
      const data = await getDocs(guestRef);
      setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }


    getGuests();
  }, [])
  console.log(guests)

  return (

    <div className="App">


      <div className="imageCont">

        <h1 className="imageTitle">
          STEPHEN & TAYLOR
        </h1>
        <p>Join us for free beer, food, fun and help us celebrate our love together!</p>
      </div>
      {/* Main display with stamp and arrows */}
      <div className="infoCont">
        <div className="infoMain">
          <img className="stamp" src={stamp} />

          <svg class="arrows">
            <path class="a1" d="M0 0 L30 32 L60 0"></path>
            <path class="a2" d="M0 20 L30 52 L60 20"></path>
          </svg>
        </div>
        {/* Section with date and time and links to next sections */}
        <div className="infoTime">
          <h2>Sunday, August 14th</h2>
          <p>Time</p>
          <h3>6pm-10pm</h3>
          <p>Place</p>
          <h3>Rising Tide Brewery <br /> 103 Fox Street <br /> Portland, ME</h3>
          <p className="resMenuLinks"><a href="#reserve">Reserve</a> || <a href="#menu">Menu</a> </p>
        </div>


        <div id="reserve" className="infoRes">
          <div>
            <h1>RSVP</h1>
            <form id="rsvpForm" className="resForm">
              <label >RSVP</label>
              <select
                onChange={(event) => {
                  setAttending(event.target.value)
                  checkForm()
                }} >
                <option value="none" selected>Select an Option</option>
                <option value="Attending">Attending</option>
                <option value="Not Attending">Not Attending</option>
                <option value="Pending">Pending...</option>
              </select>
              <label>Name: </label>
              <input name='name' id='name' type="text" placeholder='Dolly Parton'
                onChange={(event) => {
                  setNewGuest(event.target.value)
                  checkForm()
                }} />

              <label>Email:</label>
              <input name="email" id="email" type="text" placeholder="Dolly@dollywood.com"
                onChange={(event) => {
                  setEmail(event.target.value)
                  checkForm()
                }} />

              
              <button onClick={(e) => {
                e.preventDefault()
                createGuest()
              }}
              > Enter </button>
            </form>
          </div>

        </div>

        <div id="menu" className="infoMenu">

        </div>

      </div>

    </div>
  );
}

export default App;
