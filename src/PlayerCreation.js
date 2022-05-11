const abortCont = new AbortController();

        fetch("https://api.spotify.com/v1/me/player/recently-played/?limit=6", { // to fetch recently played
            signal: abortCont.signal,
            method: "GET",
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type' : 'application/json'
            }
        })
        .then(async res => {
            return await res.json();
        })
        .then(data => {
            setRecentPlayed(data.items)
            // console.log("recent updated")
        })
        .catch(err => {
            if (err.name === 'AbortError'){
                // console.log('fetch aborted')
            }
        })

        // return () => abortCont.abort();



{/* <div className="now-playing">
                <img src={current_track.album.images[0].url} className="now-playing cover" alt="" />
                <div className="now-playing side">
                    <div className="now-playing name">{current_track.name}</div>
                    <div className="now-playing artist">{current_track.artists[0].name}</div>
                    <button className="btn-spotify" onClick={() => {player.previousTrack()}}>&lt;&lt;</button>
                    <button className="btn-spotify" onClick={() => {player.togglePlay()}}>{is_paused ? "PLAY" : "PAUSE"}</button>
                    <button className="btn-spotify" onClick={() => {player.nextTrack()}}>&gt;&gt;</button>
                </div>
            </div> */}