const millisToMinutesAndSeconds = (millis) => {
    var hours = Math.floor(millis / 3600000);
    let minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);

    if(hours >= 1) {
        minutes = Math.floor((millis % 3600000) / 60000).toFixed(0);
        return hours + " hours " + minutes + " minutes";
    } else if (minutes >=1) {
    return minutes + " minutes " + seconds + " seconds";
    } else {
        return seconds + " seconds";
    }
};

module.exports.millisToMinutesAndSeconds = millisToMinutesAndSeconds;