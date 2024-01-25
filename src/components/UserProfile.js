import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchCountriesAsync, fetchCurrentTimeAsync } from '../features/countryandtimeSlice';
import '../assets/style/userprofile.css';
import CustomButton from './commoncomponents/CustomButton';
import CustomCard from './commoncomponents/CustomCard';
const moment = require('moment-timezone'); 
const UserProfile = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // Add this line to get the navigate function
  const { countries, status, error } = useAppSelector((state) => state.countries);
  const { currentTime } = useAppSelector((state) => state.currentTime);
  const { user, posts } = location.state || {};
  const { name, email, phone, address } = user;
  const [isPaused, setIsPaused] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const [currentMinutes, setCurrentMinutes] = useState(0);
  const [currentHours, setCurrentHours] = useState(0);
  const intervalRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState("Pacific/Pitcairn");
  const [selectedPost, setSelectedPost] = useState(null);

  let now = moment.tz(currentTime, selectedCountry);
  console.log("currentTime (in Pacific/Pitcairn):",currentTime , now , now.format("HH:mm:ss"));

  useEffect(() => {
    dispatch(fetchCountriesAsync());
    dispatch(fetchCurrentTimeAsync(selectedCountry));
  }, [dispatch]);

  // let now = moment.tz(currentTime, selectedCountry);

  // useEffect(() => {
  //   if (currentTime && !isPaused) {
  //     const interval = setInterval(() => {
  //       now = now.clone().add(1, 'seconds');
  //       console.log("newTime",currentTime ,now.seconds() ,now)
  
  //       // setCurrentSeconds(newTime.seconds()); // Update only seconds
  //     }, 1000);
  //     return () => clearInterval(interval);
  //   }
  // }, [currentTime, isPaused]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
         now = now.clone();
        const shouldUpdateHour = now.seconds() === 0 && now.minutes() === 0;
        const shouldUpdateMinute = now.seconds() === 0;
        const shouldUpdateSecond = true; // Add this line
        if (shouldUpdateHour) {
          if (now.hours() === 23) {
            now.set({ hour: 0 });
            now.add(1, 'days');
            now.add(1, 'seconds');
            now.add(1, 'minutes');
          } else {
            now.add(1, 'hours');
            now.add(1, 'seconds');
            now.add(1, 'minutes');
          }
        } else if (shouldUpdateMinute) {
          // now.add(1, 'minutes');
          now.add(1, 'seconds');
        } else if (shouldUpdateSecond) { // Add this line
          now.add(1, 'seconds');
        }
        console.log("now.seconds()",now.seconds() , now.minutes() , now.hours())
       setCurrentMinutes(now)
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [currentTime, isPaused]);
  
  const formattedTime = `${now.format('HH')}:${now.format('mm')}:${now.format('ss')}`;
    console.log("currentSeconds",currentMinutes , `${now.format('HH')}:${now.format('mm')}:${now.format('ss')}`)

  // var formattedTime = '';
  // useEffect(() => {
  //   if (currentTime && !isPaused) {
  //     const interval = setInterval(() => {
  //       const now = moment.tz(currentTime, selectedCountry);
  //       const newTime = now.add(1, 'seconds').format('HH:mm:ss');
  //       setCurrentMinutes(newTime)
  //       console.log("slkjdlsf",newTime)
  //     }, 1000);
  
  //     return () => clearInterval(interval);
  //   //   const intervalId = setInterval(() => {

        
  //   //     console.log("currentTime", currentTime)
  //   //     const now = new Date(currentTime);
  //   //     console.log("now", now)
  //   //     setCurrentSeconds(now.getSeconds());
  //   //     setCurrentMinutes(now.getMinutes());
  //   //     setCurrentHours(now.getHours());
  //   //   }, 1000);
  //   //   intervalRef.current = intervalId;
  //   // } else {
  //   //   return () => clearInterval(intervalRef.current); // Clear interval when component unmounts
  //   // }
  //   }
  // }, [currentTime, isPaused]);
  // formattedTime = `${currentHours.toString().padStart(2, '0')}:${currentMinutes
  //   .toString()
  //   .padStart(2, '0')}:${currentSeconds.toString().padStart(2, '0')}`;
  
       console.log("currentMinutes",currentMinutes)
  const PauseStartButtonHandler = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      // Fetch initial time from API if needed

      // dispatch(fetchCurrentTimeAsync(selectedCountry));
    } else {
      clearInterval(intervalRef.current);
    }
  };

  const handleCountryChange = (event) => {
    // setSelectedCountry(event.target.value);
    dispatch(fetchCurrentTimeAsync(event.target.value)); // Fetch initial time for new country
  };

  const BackButtonHandler = () => {
    navigate('/');
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
  };

  console.log("selectedPost", selectedPost)

  return (
    <>
      <div>
        <div className='page-title'>UserProfile</div>
        <div className='profile-page-container'>
          <div className='profile-page-button-container'>
            <div>
              <CustomButton label='Back' onClick={BackButtonHandler} />
            </div>
            <div className='profile-page-dropdown-container'>
              <div>
                <select value={selectedCountry} onChange={handleCountryChange}>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>{formattedTime}</div>
            </div>
            <div>
              <CustomButton label={isPaused ? 'Start' : 'Pause'} onClick={PauseStartButtonHandler} />
            </div>
          </div>
          <div className='user-details-container'>
            <div>
              <div>{name}</div>
            </div>
            <div>
              <div>
                Address: {address?.city} {address?.street}
              </div>
              <div>Email: {email}</div>
              <div>Phone: {phone}</div>
            </div>
          </div>
          <div className='postcard-container'>
            {posts.length > 0 ? (
              posts.map((result, index) => (
                <div key={index} onClick={() => handleCardClick(result)}>
                  <CustomCard title={result.title} content={result.body} />
                </div>
              ))
            ) : (
              <div>No posts available</div>
            )}
            {/* Inside your JSX */}
            {selectedPost && (
              <div className='popup-overlay' onClick={closePopup}>
                <div className='popup-content' onClick={(event) => event.stopPropagation()}>
                  <span className='close-button' onClick={closePopup}>&times;</span>
                  <h2>{selectedPost.title}</h2>
                  <p>{selectedPost.body}</p>
                  <p>User ID: {selectedPost.userId}</p>
                  <p>Post ID: {selectedPost.id}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
