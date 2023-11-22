import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Arrivals from './Arrivals'
import Departures from './Departures'

function TrainStation() {
  const [departureMode, setDepartureMode] = useState(false)
  const [searchParams] = useSearchParams()
  const date = searchParams.get('date')

  const sncfDate = date.replace(/-|:|T/g, '') + '00'

  return (
    <div className="train-station">
      plop {date}
      <div className="directions">
        <button
          type="button"
          className={`directions__departures ${
            departureMode ? 'directions__departures--active' : ''
          }`}
          onClick={() => setDepartureMode(true)}
          onKeyPress={() => setDepartureMode(true)}
        >
          Départs
        </button>
        <button
          type="button"
          className={`directions__arrivals ${
            departureMode ? '' : 'directions__arrivals--active'
          }`}
          onClick={() => setDepartureMode(false)}
          onKeyPress={() => setDepartureMode(false)}
        >
          Arrivées
        </button>
      </div>
      {departureMode && <Departures date={sncfDate} />}
      {!departureMode && <Arrivals date={sncfDate} />}
    </div>
  )
}

export default TrainStation
