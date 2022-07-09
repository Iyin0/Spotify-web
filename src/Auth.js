let spotify_client_id = '914b034c51f548e48a0fe061861beee7';
let spotify_client_secret = 'c15efda2da994aa4b85268537802e161';
const redirect_uri = "https://iyin0.github.io/spotify-web";
const auth_endpoint = "https://accounts.spotify.com/authorize?";
const token_endpoint = 'https://accounts.spotify.com/api/token';
const response_type = 'code';
const show_dialog = false;
let code = null;
const grant_type = 'authorization_code';
const grant_refresh_type = 'refresh_token'


const generateState = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

let scope = "streaming user-read-email user-read-private user-read-playback-state user-library-read user-read-recently-played user-top-read";

let state = generateState(16);

export function requestAuth(e) {
    // localStorage.setItem("client_id", spotify_client_id)
    // localStorage.setItem("client_secret", spotify_client_secret)
    e.preventDefault();
    window.location.href = `${auth_endpoint}client_id=${spotify_client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}&state=${state}&show_dialog=${show_dialog}`
}

export function onLoad() {
    const queryString = window.location.search
    if (!code && queryString) {
        let urlParams = new URLSearchParams(queryString)
        code = urlParams.get('code')
    }
    return code
}

export function getAccessToken() {
    let body = `grant_type=${grant_type}&code=${code}&redirect_uri=${redirect_uri}&client_id=${spotify_client_id}&client_secret=${spotify_client_secret}`
    getToken(body);
}

export async function getToken(body) {
    window.history.pushState("", "", redirect_uri); // to remove param from url
    const abortCont = new AbortController();
    await fetch(token_endpoint, {
        signal: abortCont.signal,
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(spotify_client_id + ':' + spotify_client_secret),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body
    }
    )
        .then(response => {
            if (response.status !== 200 && localStorage.getItem("access_token") === false) {
                console.log("Error sccessing the token. Status Code: " + response.status)
            }
            return response.json()
        })
        .then(data => {
            if (data.access_token !== undefined) {
                let access_token = data.access_token;
                localStorage.setItem("access_token", access_token);
                console.log("Access Token stored");
                // window.location.href = "http://localhost:3000/"; // to redirect to home page after getting the tokens
            }
            if (data.refresh_token !== undefined) {
                let refresh_token = data.refresh_token;
                localStorage.setItem("refresh_token", refresh_token);
                console.log("Refresh Token stored");

            }
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                // console.log('fetch aborted')
            }
        })
    return () => abortCont.abort();
}

export function logout() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("current_track")
    window.location.href = "http://localhost:3000/";
}

export function resetToken() {
    console.log('refresh token activated')
    let refresh_token = localStorage.getItem("refresh_token")
    let body = `grant_type=${grant_refresh_type}&refresh_token=${refresh_token}&client_id=${spotify_client_id}`
    getToken(body);
}