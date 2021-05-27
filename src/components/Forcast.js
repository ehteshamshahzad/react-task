import { useEffect } from 'react';
import { useHistory } from 'react-router';
import './Style.css';

function Forcast() {

    const history = useHistory();
    // useEffect(() => {
    //     console.log(history.location.state.date);
    //     console.log(history.location.state.day);
    // }, []);

    return (
        <div className="Style">
            <h1>Forcast!</h1>

            {(history.location != undefined) ? (

                <div>{history.location.state.date}

                    <div>{history.location?.state.hour.map(h => (

                        <div className="list" key={h.time_epoch}>

                            <div>Time: {h.time}</div>
                            <div>Temperature: {h.temp_c}&#8451;</div>
                            <div>Feels like: {h.feelslike_c}&#8451;</div>

                            <div>Wind speed: {h.wind_kph}km/h</div>
                            <div>Wind direction: {h.wind_dir}</div>
                            <div>Humidity: {h.humidity}%</div>

                            <div>{h.condition.text}</div>
                            <img className="padding" src={h.condition.icon} alt="" />

                        </div>
                    ))}
                    </div>
                </div>
            ) : ('')}
        </div >
    );
}

export default Forcast;
