import Buddy_Icon from './Buddy_Icon.png'
import axios from "axios";

const NoBuddy = () => {
  const handleSearch = async () => {
    try {
      // Make an API request using Axios
      const response = await axios.get("/search");

      // Handle the response data
      console.log(response.data);

      // Perform any necessary actions with the data
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };

  return (
    <>
    <img src= {Buddy_Icon}/>
    <p>You currently have no Accountability Buddy.</p>
    <button onClick={handleSearch}>Search Buddy</button>
    </>
  )
}

export default NoBuddy;
