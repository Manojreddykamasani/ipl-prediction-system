import React,{useState} from 'react'
function Score({scorechange,score,type}) {
    
  return (

    <div>
      <label>Enter  {type} Score:   </label>
      <input type="number" onChange={scorechange} value={score} step='5'/>
    </div>
  )
}

export default Score
