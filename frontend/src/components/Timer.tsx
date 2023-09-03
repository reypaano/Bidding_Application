import React, { useState, useEffect } from 'react';
import { Item } from '../models/item'
import * as BiddingApi from "../network/bidding_app_api"

interface CountdownProps {
    countdownDuration: number;
    createdDate: Date
    item: Item
  }

function Timer({countdownDuration, createdDate, item}: CountdownProps) {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState('');
    const [timerActive, setTimerActive] = useState(true); // Automatically start the timer
    
    const newCreatedDate = new Date(createdDate)
    useEffect(() => { 
      // Calculate the current time in seconds since midnight
      const now = new Date();
      const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  
      // Calculate the target time in seconds based on the current hour and minute
      const targetSeconds = newCreatedDate.getHours() * 3600 + newCreatedDate.getMinutes() * 60;
  
      // Calculate the initial totalSeconds value based on countdownDuration
      const initialTotalSeconds = countdownDuration * 3600 - (currentSeconds - targetSeconds);
  
      setTotalSeconds(initialTotalSeconds);
    }, [countdownDuration]);
  
    useEffect(() => {
      if (timerActive && totalSeconds > 0) {
        const interval = setInterval(() => {
          setTotalSeconds((prevSeconds) => { console.log(prevSeconds);
            if (prevSeconds > 1) { 
              setTimeRemaining(formatTimeRemaining(prevSeconds - 1));
              return prevSeconds - 1;
            } else {
              setTimerActive(false);
              setTimeRemaining("ENDED")
              clearInterval(interval);
              closeItem();
              return 0;
            }
          });
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [totalSeconds, timerActive]);
  
    const formatTimeRemaining = (seconds: number) => {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
  
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(
        2,
        '0'
      )}:${String(secs).padStart(2, '0')}`;
    };
  
    const closeItem = async  () => {
     await BiddingApi.closeItem(item._id)

    };
  
    return (
      <div className="countdown">
        <h2>{timeRemaining}</h2>
      </div>
    );
  }
  
export default Timer;
