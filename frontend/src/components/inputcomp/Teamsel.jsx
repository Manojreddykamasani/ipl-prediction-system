import React from 'react'

function Teamsel({inning,teams,selectedteam,excludeteam,handleTeamChange}) {
  const filteredteams= teams.filter(team=>team!=excludeteam
  )
  return (
    <div className='container'>
            <label > Choose {inning} team: </label>
            <select id="iplteams" value={selectedteam}
            onChange={(e)=>handleTeamChange(inning,e.target.value)}
            required
            >
              <option value=""> please choose a team</option>
              {
                filteredteams.map((team,index)=>{
                  return <option key={index} value={team}>{team}</option>
                })
              }
            </select>
        </div>
  )
}

export default Teamsel
