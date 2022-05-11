const access_token = localStorage.getItem("access_token")

export const getState = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player", { 
        signal: abortCont.signal,
        method: "GET",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    .then(async res => {
        if (res.status === 200){
            return await res.json();
        }
    })
    .then(data => {
        console.log(data);         
    })
    .catch(err => {
        if (err.name === 'AbortError'){
        }
    })
    return () => abortCont.abort();
}

export const pausePlayback = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/pause", { 
        signal: abortCont.signal,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}

export const resumePlayback = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/play", { 
        signal: abortCont.signal,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}

export const skipToNext = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/next", { 
        signal: abortCont.signal,
        method: "POST",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}

export const skipToPrevious = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/previous", { 
        signal: abortCont.signal,
        method: "POST",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}

export const shuffle = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/shuffle", { 
        signal: abortCont.signal,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}

export const repeat = () => {
    const abortCont = new AbortController();
    fetch("https://api.spotify.com/v1/me/player/repeat", { 
        signal: abortCont.signal,
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type' : 'application/json'
        }
    })
    return () => abortCont.abort();
}