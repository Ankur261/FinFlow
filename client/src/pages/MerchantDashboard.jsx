import { React, useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './Loading';



export default function MerchantDashBoard() {

    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://localhost:7261/api/Merchant")
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            })
    }, [])

    if(loading) {
        return (<Loading/>)
    }
    if(error) {
        return (
            <div>
                Error: {error}
            </div>
        )
    }
    return (
        <div>
            {
                data.map((value, index) => {

                    return(
                       <div key={index}>
                         {value.businessName}, 
                        {value.businessType}
                       </div>
                        )
                })
            }
        </div>
    );
}
