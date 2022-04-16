
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { db } from "./firebase"
import { collection, getDocs, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import stamp from "./photos/stamp.png";




function App() {
  const [guests, setGuests] = useState([]);
  const [formComplete, setFormComplete] = useState(null);

  const form = useRef();
  const name = useRef();
  const email = useRef();
  const attending = useRef();

  const guestRef = collection(db, "guests");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail', 'wedding_template', form.current, 'YOUR_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  const createGuest = async () => {
    await addDoc(guestRef, { name: name.current.value, email: email.current.value, attending: attending.current.value });
    document.getElementById("rsvpForm").reset()
  }

  const checkForm = () => {
    if (email.current.value != "" && name.current.value != "" && attending.current.value != 'none') {
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
            <form ref={form} id="rsvpForm" className="resForm"
            onSubmit={(e) => {
              
              console.log(attending.current.value, email.current.value, name.current.value)
              e.preventDefault()
              if (email.current.value != "" && name.current.value != "" && attending.current.value != "none") {
                createGuest()
                setFormComplete(true)
                attending.current.value =''
                email.current.value = ''
                name.current.value = ''
              }
              else {
                setFormComplete(false);
              }
            }}>

              <label>Name: </label>
              <input name='name' id='name' type="text" placeholder='Dolly Parton' ref={name} />

              <label>Email:</label>
              <input name="email" id="email" type="text" placeholder="Dolly@dollywood.com" ref={email} />

              <label >RSVP</label>
              <select name='attending' ref={attending}>
                <option value="none" selected>Select an Option</option>
                <option value="Attending">Attending</option>
                <option value="Not Attending">Not Attending</option>
                <option value="Pending">Pending...</option>
              </select>


              <button className="rsvpButton" 
              > Enter </button>
              {formComplete === true &&
                <h3 className='formPopup'>Thank you, can't wait to party with you!</h3>
              }
              {formComplete === false &&
                <h3 className='formPopup' >Please fill all boxes!</h3>
              }

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
