
import { useState, useRef, useEffect } from 'react';
import './App.css';
import { db } from "./firebase"
import { collection, addDoc, getDocs } from "firebase/firestore";
import emailjs from "emailjs-com";
import stamp from "./photos/stamp.png";

function App() {
  const [guests, setGuests] = useState([]);
  const [formComplete, setFormComplete] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [attendingError, setAttendingError] = useState(false);
  const [attendingResponse, setAttendingResponse] = useState()
  const [attendingValue, setAttendingValue] = useState();
  const [guestExists, setGuestExists] = useState(false);

  const form = useRef();
  const name = useRef();
  const email = useRef();
  const attending = useRef();
  const guestRef = collection(db, "guests");

  const sendEmail = (e) => {
    emailjs.sendForm('service_5gsgrn9', 'wedding_template', form.current, "-y-c3EujLL6PiSZ-E")
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  const errorCheck = () => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let error = false;
    setNameError(false);
    setEmailError(false);
    setAttendingError(false);
    if (!name.current.value) {
      setNameError(true);
      error = true;
    }
    if (!email.current.value || !email.current.value.match(validRegex)) {
      setEmailError(true);
      error = true;
    }
    if (!attending.current.value || attending.current.value === "none") {
      setAttendingError(true);
      error = true;
    }
    return error;
  }
  const createGuest = async () => {
    await addDoc(guestRef, { name: name.current.value, email: email.current.value, attending: attending.current.value });
  }

  const guestCheck = () => {
    setAttendingResponse(null);
   const checkList = guests.filter((guest) => guest.email === email.current.value)
   if(checkList.length > 0) {
    setGuestExists(true);
    return true;
   }
   setGuestExists(false);
   return false;
  }
  const getGuests = async () => {
    const data = await getDocs(guestRef);
    setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  useEffect(() => {
    getGuests();
  }, [])

  return (
    <div className="App">

      <div className="imageCont">

        <h1 className="imageTitle">
          STEPHEN & TAYLOR
        </h1>
        <p>Join us for a beautiful sail, drinks and snacks to celebrate!</p>
      </div>
      {/* Main display with stamp and arrows */}
      <div className="infoCont">
        <div className="infoMain">
          <img alt="wax initial stamp " className="stamp" src={stamp} />

          <svg className="arrows">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
          </svg>
        </div>
        {/* Section with date and time and links to next sections */}
        <div id="ceremony" className="infoTime">
          <h1>Ceremony Info</h1>
          <div className="infoBox">
            <h2>Sunday, August 14th</h2>
            <p>Time</p>
            <h2>10:30-1pm</h2>
            <div className="arrival-info">
              Make sure to give yourself plenty of time to find parking and get to the pier beforehand
            </div>
            <p>Place</p>
            <h2>Maine State Pier</h2>
            <span className="msa">Maps link: <a target="_blank" rel="noopener noreferrer" href="https://g.page/francesproject?share">Maine Sailing Adventures</a></span>
            <h3> Portland, ME</h3>
          </div>
          <div className="buttonDiv">
            <button className="receptionButton" onClick={() => window.location.href = "#reception"}>Reception Info</button>
            <button className="reserveButton" onClick={() => window.location.href = "#reserve"}>Reserve</button>
          </div>
        </div>

        <div id="reserve" className="infoRes">
          <h1>RSVP</h1>
          <div>
            <h4 className="plusone">Due to limited capacity this is not a plus one event, we only have space for those listed on your invitation.<br />Thanks for understanding!</h4>
            <form ref={form} id="rsvpForm" className="resForm">
              <div>
                <label>Name: </label>
                <input name='name' id='name' type="text" placeholder='Dolly Parton' ref={name} />
                {nameError && <p className="error">Please enter your name</p>}

                <label>Email:</label>
                <input name="email" id="email" type="email" placeholder="Dolly@dollywood.com" ref={email} />
                {emailError && <p className="error">Please enter valid email.</p>}

                <label >RSVP</label>
                <select name='attending' ref={attending}>
                  <option value="none" defaultValue>Select an Option</option>
                  <option value="Attending">Attending</option>
                  <option value="Not Attending">Not Attending</option>
                </select>
                {attendingError && <p className="error"> Please select one</p>}
              </div>
              {formComplete === true &&
                <h3 className='formPopup'>
                  {attendingResponse === "Attending"
                    && "Thank you, can't wait to party with you!"}
                    {attendingResponse === "Not Attending" && "Sorry to hear it, we'll have to party another time!" }
                </h3>
              }

              <button onClick={(e) => {
                e.preventDefault();
                if (!errorCheck()) {
                  if (!guestCheck()) {
                    
                    sendEmail()
                    setAttendingResponse(attending.current?.value === "Attending" ? "Attending" : "Not Attending") 
                    setFormComplete(true)
                    createGuest().then(() => {
                      attending.current.value = null
                      email.current.value = ''
                      name.current.value = ''
                    })
                    getGuests();
                  }
                }
                else {
                  setFormComplete(false);
                }
              }} className="rsvpButton"
              > Enter </button>
              {guestExists && <p>Looks like you already RSVP'd!</p>}
            </form>

          </div>
          <div className="buttonDiv">
            <button className="receptionButton" onClick={() => window.location.href = "#reception"}>Reception Info</button>
            <button className="rsvpButton" onClick={() => window.location.href = "#ceremony"}>Ceremony Info</button>
          </div>

        </div>

        <div id="reception" className="infoReception">
          <h1>Reception Info</h1>
          <div className="infoBox">
            <h2>Sunday, August 14th</h2>
            <p>Time</p>
            <h2>3pm-evening</h2>
            <p>Place</p>
            <h2>Ponutt Household</h2>
            <h3>Buxton, Me</h3>
            <div className="arrival-info">
              Will email out the address closer to event date, as to not have our gracious friends address
              on a public website.
            </div>
          </div>
          <div className="buttonDiv">
            <button className="receptionButton" onClick={() => window.location.href = "#ceremony"}>Ceremony Info</button>
            <button className="reserveButton" onClick={() => window.location.href = "#reserve"}>Reserve</button>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
