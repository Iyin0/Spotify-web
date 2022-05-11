const convert = (value) => {
    let hours = Math.floor(value / 3600);
    let minutes = Math.floor((value - (hours * 3600)) / 60);
    let seconds = value - (hours * 3600) - (minutes * 60);

    if(hours < 1) {
        hours = "";
    }
    if(minutes < 1) {
        minutes = "0:"
    }
    else {
        minutes = minutes + ":";
    }
    if(seconds < 1) {
        seconds = "00"
    }
    else if(seconds < 10) {
        seconds = "0" + seconds;
    }
    return(`${hours}${minutes}${seconds}`)
}

export default convert