
import { useState,  useRef } from 'react';
import './App.css';
import { db } from "./firebase"
import { collection, addDoc } from "firebase/firestore";
import emailjs from "emailjs-com";
import stamp from "./photos/stamp.png";




function App() {
  // const [guests, setGuests] = useState([]);
  const [formComplete, setFormComplete] = useState(null);

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

  const createGuest = async () => {
    await addDoc(guestRef, { name: name.current.value, email: email.current.value, attending: attending.current.value });
    document.getElementById("rsvpForm").reset()
  }


  // useEffect(() => {
  //   const getGuests = async () => {
  //     const data = await getDocs(guestRef);
  //     setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  //   }


  //   getGuests();
  // }, [])

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
          <img alt="wax initial stamp "className="stamp" src={stamp} />

          <svg class="arrows">
            <path className="a1" d="M0 0 L30 32 L60 0"></path>
            <path className="a2" d="M0 20 L30 52 L60 20"></path>
          </svg>
        </div>
        {/* Section with date and time and links to next sections */}
        <div className="infoTime">
          <h2>Sunday, August 14th</h2>
          <p>Time</p>
          <h3>10:30-1pm</h3>
          <div className="arrival-info">
            Make sure to give yourself plenty of time to find parking and get to the pier before hand
          </div>
          <p>Place</p>
          <h3>Maine State Pier</h3>
          <span className="msa">(Maine Sailing Adventures)</span>
          <h4> Portland, ME</h4>
          <p className="resMenuLinks"><a href="#reserve">Reserve</a>  </p>
        </div>


        <div id="reserve" className="infoRes">
          <div>
            <h1>RSVP</h1>
            <h4 className="plusone">Due to limited capacity this is not a plus one event, we only have space for those listed on your invitation.<br/>Thanks for understanding!</h4>
            <form ref={form} id="rsvpForm" className="resForm"
            onSubmit={(e) => {
              
              e.preventDefault()
              if (email.current.value !== "" && name.current.value !== "" && attending.current.value !== "none") {
                createGuest()
                sendEmail()
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
              <input name="email" id="email" type="email" placeholder="Dolly@dollywood.com" ref={email} />

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

        {/* <div id="menu" className="infoMenu">

        </div> */}

      </div>

    </div>
  );
}

export default App;
