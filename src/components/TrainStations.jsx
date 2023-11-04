import React from 'react'
import propTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

function TrainStations({ stations }) {
  return (
    <div className="train-stations">
      {Object.keys(stations).map((stationName) => (
        <NavLink
          className={({ isActive }) =>
            `train-stations__link ${
              isActive ? 'train-stations__link--active' : ''
            }`
          }
          key={stationName}
          to={`${stations[stationName]}`}
        >
          <span>{stationName}</span>
        </NavLink>
      ))}
    </div>
  )
}

TrainStations.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  stations: propTypes.object.isRequired,
}

export default TrainStations
