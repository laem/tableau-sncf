import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

function CityCard({ city }) {
  return (
    <Link
      to={`${city}`}
      className="city-card"
      style={{ backgroundImage: `url('./images/${city}.webp')` }}
    >
      <h3 className="city-card__name">{city}</h3>
    </Link>
  )
}

CityCard.propTypes = {
  city: propTypes.string.isRequired,
}

export default CityCard
