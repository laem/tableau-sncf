import React, { useState, useEffect } from 'react'
import axios from 'axios'
import propTypes from 'prop-types'

function Origin({ idArrival }) {
  const [stops, setStops] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://api.sncf.com/v1/coverage/sncf/vehicle_journeys/${idArrival}`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_API_KEY}`,
          },
        }
      )
      .then((response) => {
        const stopsApi = response.data.vehicle_journeys[0].stop_times.map(
          (stop) => stop.stop_point.name
        )
        setStops(stopsApi)
      })
  }, [])

  return (
    <>
      <p className="arrival__origin">{stops[0]}</p>
      <div className="arrival__stops">
        <ul className="stops">
          {stops.map((stop, index) => (
            <li className="stops__station" key={stop}>
              {stop}
              <img
                src="/images/yellow.jpg"
                alt="yellow point"
                style={{
                  display: `${index === stops.length - 1 ? 'none' : 'inline'}`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

Origin.propTypes = {
  idArrival: propTypes.string.isRequired,
}

export default Origin
