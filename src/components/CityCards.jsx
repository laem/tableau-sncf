import React from 'react'
import CityCard from './CityCard'

function CityCards() {
  const cities = [
    'bordeaux',
    'brest',
    'lille',
    'lyon',
    'marseille',
    'nantes',
    'paris',
    'strasbourg',
    'toulouse',
  ]

  return (
    <div className="city-cards">
      {cities.map((city) => (
        <CityCard key={city} city={city} />
      ))}
    </div>
  )
}

export default CityCards
