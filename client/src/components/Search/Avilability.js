const Avilability = () =>{

  const handleAvailability = (evt) => {
    evt.preventDefault();
    axios.post('/search/availability', {avilability:true})

  }

  return (
    <>
    <p>You are currently not available for pairing</p>
    <button onClick={handleAvailability}>Turn On Availability</button>
    </>
  )
}

export default Avilability;
