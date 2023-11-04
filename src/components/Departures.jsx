import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { parseUTCDate, getFullMinutes, calculateDelay } from './Utils'
import Stops from './Stops'

function Departures() {
  const { codeStation } = useParams()

  // eslint-disable-next-line no-unused-vars
  const [nextDepartures, setNextDepartures] = useState([])

  useEffect(async () => {
    const response = await axios.get(
      `https://api.sncf.com/v1/coverage/sncf/stop_areas/${codeStation}/departures`,
      {
        headers: {
          Authorization: `${process.env.REACT_APP_API_KEY}`,
        },
      }
    )

    const nextDeparturesAPI = response.data.departures.map((departure) => ({
      id: departure.links[1].id,
      operator: '',
      transportationMode: departure.display_informations.network,
      trainNumber: departure.display_informations.headsign,
      baseDepartureTime: parseUTCDate(
        departure.stop_date_time.base_departure_date_time
      ),
      realDepartureTime: parseUTCDate(
        departure.stop_date_time.departure_date_time
      ),
      destination: departure.display_informations.direction.split(' (')[0],
    }))

    setNextDepartures(nextDeparturesAPI)
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
    <div className="departures">
      {nextDepartures.map((departure, index) => (
        <div
          key={departure.id}
          className={`departure ${index % 2 ? '' : 'departure--light'}`}
        >
          <p className="departure__operator">{departure.operator}</p>
          <p className="departure__train-type">
            {departure.transportationMode}
          </p>
          <p className="departure__train-number">{departure.trainNumber}</p>
          <p
            className={`departure__time ${
              isTimeDisplayed ? '' : 'departure__time--disappear'
            }`}
          >
            {departure.baseDepartureTime.getHours()}h
            {getFullMinutes(departure.baseDepartureTime)}
          </p>
          <p
            className={`departure__delay ${
              isTimeDisplayed ? 'departure__delay--disappear' : ''
            }`}
          >
            {calculateDelay(
              departure.baseDepartureTime,
              departure.realDepartureTime
            )}
          </p>
          <p className="departure__destination">{departure.destination}</p>
          <Stops idDeparture={departure.id} />
        </div>
      ))}
    </div>
  )
}

export default Departures
