const Avilability = () =>{

  const handleAvailability = (evt) => {
    evt.preventDefault();
    axios.post('/search/availability', { searchValue: searchValue })

  }

  return (
    <>
    <p>You are currently not available for pairing</p>
    <button onClick={handleAvailability}>Turn On Availability</button>
    </>
  )
}

export default Avilability;
