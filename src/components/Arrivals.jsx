import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { parseUTCDate, getFullMinutes, calculateDelay } from './Utils'
import Origin from './Origin'

function Arrivals() {
  const { codeStation } = useParams()

  const [nextArrivals, setNextArrivals] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/arrivals`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        const arrivals = response.data.arrivals.map((arrival) => ({
          id: arrival.links[1].id,
          operator: '',
          transportationMode: arrival.display_informations.network,
          trainNumber: arrival.display_informations.headsign,
          baseArrivalTime: parseUTCDate(
            arrival.stop_date_time.base_arrival_date_time
          ),
          realArrivalTime: parseUTCDate(
            arrival.stop_date_time.arrival_date_time
          ),
          destination: arrival.display_informations.direction.split(' (')[0],
        }))
        setNextArrivals(arrivals)
      })
  }, [codeStation])

  const [isTimeDisplayed, setIsTimeDisplayed] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTimeDisplayed((prevIsTimeDisplayed) => !prevIsTimeDisplayed)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="arrivals">
      {nextArrivals.map((arrival, index) => (
        <div
          key={arrival.id}
          className={`arrival ${index % 2 ? '' : 'arrival--light'}`}
        >
          <p className="arrival__operator">{arrival.operator}</p>
          <p className="arrival__train-type">{arrival.transportationMode}</p>
          <p className="arrival__train-number">{arrival.trainNumber}</p>
          <p
            className={`arrival__time ${
              isTimeDisplayed ? '' : 'arrival__time--disappear'
            }`}
          >
            {arrival.baseArrivalTime.getHours()}h
            {getFullMinutes(arrival.baseArrivalTime)}
          </p>
          <p
            className={`arrival__delay ${
              isTimeDisplayed ? 'arrival__delay--disappear' : ''
            }`}
          >
            {calculateDelay(arrival.baseArrivalTime, arrival.realArrivalTime)}
          </p>
          <Origin idArrival={arrival.id} />
        </div>
      ))}
    </div>
  )
}

export default Arrivals
