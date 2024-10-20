import React,{useState} from 'react'
function Oversel({value,handleChange}) {

    return (
      <>
      <label>No of overs Played:       </label>
      <input
        type="number"
        step="0.1"
        value={value}
        onChange={handleChange}
        placeholder="Enter no of overs bowled"
        min='0'
        max='20'
      />
      </>
    );

}

export default Oversel
