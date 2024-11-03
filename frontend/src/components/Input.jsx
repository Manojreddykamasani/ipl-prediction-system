import React, { useEffect, useState } from 'react'
import Teamsel from './inputcomp/Teamsel';
import Oversel from './inputcomp/Oversel';
import Score from './inputcomp/Score';
import Venue from './inputcomp/Venue';
function Input() {
  const transform = {'Chennai Super Kings': 1,'Delhi Capitals': 2,'Kolkata Knight Riders': 3,'Mumbai Indians': 4,'Punjab Kings': 5,'Rajasthan Royals': 6,'Royal Challengers Bangalore': 7,'Sunrisers Hyderabad': 8,'Lucknow Super Giants': 9,'Gujarat Titans': 10}
  const stadiumTeamMap = { "Wankhede Stadium": 4, "MA Chidambaram Stadium": 1, "M. Chinnaswamy Stadium": 7, "Arun Jaitley Stadium": 2, "Eden Gardens": 3, "Rajiv Gandhi International Cricket Stadium": 8, "Sawai Mansingh Stadium": 6, "Punjab Cricket Association IS Bindra Stadium": 5, "Narendra Modi Stadium": 10, "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium": 9, "Others": -1 };
  const [score,setscore]=useState(0)  
  const [currscore,setcurrscore]=useState(0)
    const scorechange=(event)=>{
        setscore(event.target.value)
    }
  const [batlogo,setbatlogo]=useState(null)
  const [bowlogo,setbowlogo]=useState(null)
  const [winlogo,setwinlogo]=useState(null)
  const [value, setValue] = useState('');
  const handleChange = (event) => {
      let inputValue = parseFloat(event.target.value);
      if (!isNaN(inputValue)) {
        if (inputValue-Math.floor(inputValue) > 0.5) {
            setValue(Math.ceil(inputValue).toString());
        }
        else if(inputValue-Math.floor(inputValue) <=1 && inputValue-Math.floor(inputValue) > 0.8){
            setValue(Math.floor(inputValue)+0.5)
        }
        else {
            setValue(inputValue.toString());
          }
        } else {

          setValue(inputValue.toString());
        }
    };
        const fetchlogo = async (tn,setlogo)=>{
          try{
            const response = await fetch('http://localhost:3000/api/logo/findlogo',{
              method:"POST",
              headers:{
                'Content-Type':'application/json',
              },
              body: JSON.stringify({
                teamname:tn
              })
          })
          const data = await response.json()
          if(response.ok){
            setlogo(data.avatarUrl)
            console.log(data)
          }
          else{
            console.log("an error occured")
          }
          }
          catch(err){
            console.log(err)
          }
          
        }
      


  const inning=['batting','bowling'];
  const teams = [
    "Mumbai Indians", "Chennai Super Kings", "Royal Challengers Bangalore",
    "Delhi Capitals", "Kolkata Knight Riders", "Sunrisers Hyderabad",
    "Rajasthan Royals", "Punjab Kings", "Gujarat Titans", "Lucknow Super Giants"
  ];
  const stadiums = [
    "Wankhede Stadium",
    "MA Chidambaram Stadium",
    "M. Chinnaswamy Stadium",
    "Arun Jaitley Stadium",
    "Eden Gardens",
    "Rajiv Gandhi International Cricket Stadium",
    "Sawai Mansingh Stadium",
    "Punjab Cricket Association IS Bindra Stadium",
    "Narendra Modi Stadium",
    "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium",
    "Others"
]
  const[selectedteams,setSelectedTeams]= useState({
    batting:'',
    bowling:''
})
const handleTeamChange = (inningType, team) => {
  setSelectedTeams((prevState) => {
    let newState = { batting: prevState.batting, bowling: prevState.bowling };
    newState[inningType] = team;
    return newState;
  });
};
const[venue,setvenue]= useState(' ')
const[submitted,setsubmitted]=useState(false)
const[apiresponse,setapiresponse]=useState(null)
const handlesubmit= async (e)=>{
  e.preventDefault();
  await fetchlogo(selectedteams.batting,setbatlogo)
  await fetchlogo(selectedteams.bowling,setbowlogo)
  const arr=[transform[selectedteams.batting],transform[selectedteams.bowling],Math.floor(value),value-Math.floor(value),currscore,stadiumTeamMap[venue],score]
  const final ={
    input:arr
  }
  try{
    const response = await fetch('http://127.0.0.1:5000/predict',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body : JSON.stringify(final)
    })
    const data = await response.json()
    setapiresponse(data)
    setsubmitted(true);
  }
  catch(error){
    console.error('Error',error)
  }

}
useEffect(() => {
  if (apiresponse && apiresponse.prediction) {
    fetchlogo(apiresponse.prediction, setwinlogo);
  }
}, [apiresponse]);
const currscorechange=(e)=>{
 setcurrscore(e.target.value)
}
const handleVenuechange= (venue)=>{
  setvenue(venue)
}
const handlereset= ()=>{
  setsubmitted(false)
  setapiresponse(null)
  setSelectedTeams({batting:" ",bowling:" "})
  setvenue(" ")
  setscore(" ")
  setValue(' ')
  setlogo(null)
}
  return (
      <div className='inp'>
      <h1> Ipl match prediction System</h1>
     {submitted?(
      <div className='outdisplay'>
        <h1> Winner is {JSON.parse(JSON.stringify(apiresponse)).prediction}</h1>
        <div className='logos'>
          <div className='all'>
        { batlogo && <img src={batlogo} alt='batting team' id='log'></img>}
        { bowlogo && <img src={bowlogo} alt='bowling team' id='log'></img>}
        </div>
        <div className='win'>
        { winlogo && <img src={winlogo} alt='winning team' id='log'></img>}
        </div>
        </div>
        <button onClick={handlereset}> click to go back</button>
      </div>
     ):(
    <div>
    <form onSubmit={handlesubmit}>
    <Teamsel inning={inning[0]} teams={teams} handleTeamChange={handleTeamChange} selectedteam={selectedteams.batting} excludeteam={selectedteams.bowling}/>
    <Teamsel inning={inning[1]} teams={teams} handleTeamChange={handleTeamChange} selectedteam={selectedteams.bowling} excludeteam={selectedteams.batting}/>
     <Oversel value={value} handleChange={handleChange}/> 
     <Score score={score} scorechange={scorechange} type="first inning"/>
     <Score score={currscore} scorechange={currscorechange} type="current"/>
     <Venue handleVenuechange={handleVenuechange} venue={venue} venues={stadiums}/>
     <button type="submit" className='btn btn-warning'>Submit</button>
     <button type="reset" onClick={handlereset}> Reset</button>
    </form>
    </div>)
    }
    </div>
  )
}

export default Input