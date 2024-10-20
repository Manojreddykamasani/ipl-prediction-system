import React from 'react'

function Venue({handleVenuechange,venue,venues}) {

  return (
    <div>
      <label>Select venue</label>
      <select
      id="venue"
      value={venue}
      onChange={(e)=>handleVenuechange(e.target.value)}
      >
        <option value=" "> Select a venue</option>
        {
            venues.map((ven,ind)=>{
                return <option value={ven} key={ind}> {ven}</option>
            })
        }

      </select>
    </div>
  )
}

export default Venue
