import React, {useEffect, useState} from 'react'
import Axios from 'axios';

function Subscribe(props) {

    const [Subscribed, setSubscribed] = useState('');
    const [SubscribeNumber, setSubscribeNumber] = useState(false);


    useEffect(() => {
        let subscribeNumberVariables = {userTo: props.userTo}
        Axios.get('/api/subscribe/subscribeNumber', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.subscribeNumber)
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert('Failed to get subscriber Number')
                }
            });

        Axios.post('/api/subscribe/subscribed', subscribeNumberVariables)
            .then(response => {
                if (response.data.success) {
                    setSubscribed(response.data.subcribed)
                } else {
                    alert('Failed to get Subscribed Information')
                }
            })


    }, []);

    return (
        <div>
            <button
                //onClick={onSubscribe}
                style={{
                    backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`,
                    borderRadius: '4px', color: 'white',
                    padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
                }}>
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe