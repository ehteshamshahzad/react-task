import './Style.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const API = {
    BASE_URL: "https://api.weatherapi.com/v1/forecast.json",
    KEY: "5132e158724448bc88e212400212505",
    DAYS: "10"
}

function BasicInfo() {

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});
    const [show, setShow] = useState(false);

    const history = useHistory();

    useEffect(() => {
        if (data?.location) {

            setTimeout(() => {
                search()
            }, 300000); // 1000 = 1 second

        }
    }, [data]);

    const search = async event => {
        await fetch(`${API.BASE_URL}?key=${API.KEY}&q=${query}&days=${API.DAYS}&aqi=yes&alerts=yes`)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("API Success\n");
                    console.log(result);
                    setData(result);
                    if (!result.error) {
                        setShow(true);
                    } else { setShow(false) }
                },
                (error) => {
                    console.log("API Failed\n");
                    console.log(error);
                    setData(error);
                    setShow(false);
                }
            );
    }

    return (
        <div className="Style">

            <div className="search-box">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Enter City"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
                <button className="button" type="button" onClick={(e) => search()}>Search</button>
            </div>
            {show ? <div>
                <div>
                    <div className="container">
                        <div className="group-zero wrapper">
                            <div className="group-a">
                                <p>Measured: {data.current?.temp_c}&#8451;</p>
                                <p>Feels like {data.current?.feelslike_c}&#8451;</p>
                            </div>

                            <div className="group-b">
                                <img src={data.current?.condition.icon} alt={data.current?.condition.text} />
                                <div>{data.current?.condition.text}</div>
                            </div>

                            <div className="group-c">
                                <p>{data.location?.name}</p>
                                <div>
                                    {data.location?.region}, {data.location?.country}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container-two">
                        <div className="two">
                            <div className="group-wind">
                                <p>Wind</p>
                                <p>Speed: {data.current?.wind_kph}km/h</p>
                                <p>Degree: {data.current?.wind_degree}°</p>
                                <p>Direction: {data.current?.wind_dir}</p>
                            </div>

                            <div className="humidity">
                                <div classname="humidity-two">
                                    <p>Humidity</p>
                                    <p>{data.current?.humidity}%</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div >{data.forecast?.forecastday.map(forcast_day => (
                        <div className="list" key={forcast_day.date_epoch}>

                            <div onClick={() => history.push({
                                pathname: '/forcast',
                                state: {
                                    date: forcast_day.date,
                                    day: forcast_day.day,
                                    hour: forcast_day.hour
                                }

                            })}>
                                <div>Date: {forcast_day.date}</div>
                                <div>Max:{forcast_day.day.maxtemp_c}&#8451;</div>
                                <div>Min: {forcast_day.day.mintemp_c}&#8451;</div>
                                <div>Average: {forcast_day.day.avgtemp_c}&#8451;</div>
                                <div>Condition: {forcast_day.day.condition.text}</div>
                                <img src={forcast_day.day.condition.icon} alt={forcast_day.day.condition.text} />
                                <div><a href="/forcast">Details</a></div>
                            </div>
                        </div>
                    ))}</div>

                </div>
            </div>
                : null}
        </div >
    );
}

export default BasicInfo;