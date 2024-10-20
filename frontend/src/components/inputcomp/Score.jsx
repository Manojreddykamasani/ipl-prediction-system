import React,{useState} from 'react'
function Score({scorechange,score}) {
    
  return (

    <div>
      <label>Enter first innings Score:   </label>
      <input type="number" onChange={scorechange} value={score} step='5'/>
    </div>
  )
}

export default Score
