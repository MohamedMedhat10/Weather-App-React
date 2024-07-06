import axios from "axios";
function Forecast(props) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${props.City}&appid=${props.apiKey}`;
  axios.get(apiUrl).then((res) => {
    console.log(res.data);
  });

  return <div></div>;
}

export default Forecast;
