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

    const history = useHistory();

    useEffect(() => {
        if (data?.location) {
            // Set time out
            setTimeout(() => {
                search()
            }, 150000); // Increase later

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
                },
                (error) => {
                    console.log("API Failed\n");
                    console.log(error);
                    setData(error);
                }
            );
    }

    return (
        <div className="App">

            <div className="search-box">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Enter City"
                    onChange={e => setQuery(e.target.value)}
                    value={query}
                />
            </div>

            <button type='button' onClick={(e) => search()}>Get Info</button>

            {(data !== undefined) ? (
                <div>
                    <p>{data.location?.name}</p>
                    <p>{data.location?.region}</p>
                    <p>{data.location?.country}</p>
                    <p>{data.current?.temp_c}&#8451;</p>
                    <p>{data.current?.condition.text}</p>
                    {/* <p>{data.current?.condition.icon}</p> */}
                    <img src={data.current?.condition.icon} alt="" />
                    <p>{data.current?.wind_kph}</p>
                    <p>{data.current?.wind_degree}</p>
                    <p>{data.current?.wind_dir}</p>
                    <p>{data.current?.humidity}</p>
                    <p>{data.current?.feelslike_c}</p>


                    <p>list?</p>
                    <div>{data.forecast?.forecastday.map(forcast_day => (
                        <div key={forcast_day.date_epoch}>

                            <div onClick={() => history.push({
                                pathname: '/forcast',
                                state: {
                                    date: forcast_day.date,
                                    day: forcast_day.day,
                                    hour: forcast_day.hour
                                }

                            })}>
                                <p>Max temperature</p>
                                <p>{forcast_day.day.maxtemp_c}</p>
                            </div>
                        </div>
                    ))}</div>

                </div>

            ) : ('')}

            <button type='button' onClick={() => history.push({
                pathname: '/forcast',
                state: {
                    cityName: query,
                },
            })}>More info</button>
        </div >
    );
}

export default BasicInfo;