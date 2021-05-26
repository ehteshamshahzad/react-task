import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

function Forcast() {

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});

    const history = useHistory();

    useEffect(() => {
        console.log(history.location.state.date);
        console.log(history.location.state.day);
    }, []);



    return (
        <div className="Forcast">
            <h1>Forcast!</h1>

            {(history.location !== undefined) ? (
                <div>
                    {history.location.state.date}

                    <div>{history.location?.state.hour.map(h => (

                        <div key={h.time_epoch}>
                            <p>{h.temp_c}</p>
                            <p>{h.condition.text}</p>
                            <img src={h.condition.icon} alt="" />

                        </div>

                    ))}

                    </div>

                </div>

            ) : ('')}

        </div >
    );
}

export default Forcast;
