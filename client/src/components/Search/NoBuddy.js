import Buddy_Icon from '../Buddy/buddy_icon.jpg'
import axios from "axios";

const NoBuddy = () => {
  const handleSearch = async () => {
    try {
      const response = await axios.get("/search");
      console.log(response.data);
    } catch (error) {
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
