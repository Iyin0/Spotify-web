import { useState, useEffect } from "react";
import { resetToken } from "./Auth";

const FetchData = (uri) => {
    const [data, setData] = useState(null);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    let access_token = localStorage.getItem("access_token")

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(uri, {
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(async res => {
            if (res.status === 401){
                resetToken();
            }
            setStatus(res.status);
            if(!res.ok) {
                throw Error('Unable to fetch the required data');
            }
            return await res.json();
        })
        .then(data => {
            setData(data);
            setFetching(false);
            setError(null);
        })
        .catch(err => {
            if (err.name === 'AbortError'){

            }
            setFetching(false);
            setError(err.message);                
        })

        return () => abortCont.abort();
    }, [uri]);

    return { data, fetching, error, status}
}

export default FetchData;