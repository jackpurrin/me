import Webamp from "./webamp.js";
const webamp = new Webamp({
    initialTracks: [{
        metaData: {
            artist: "Temporex",
            title: "No Sleep",
        },
        url: "/assets/audio/nosleep.mp3",
        duration: 91,
    }, ],
    windowLayout: {
        main: {
            position: {
                top: 0,
                left: 0
            },
            shadeMode: false,
            closed: false,
        },
        equalizer: {
            position: {
                top: 230,
                left: 0
            },
            shadeMode: false,
            closed: false,
        },
        playlist: {
            position: {
                top: 500,
                left: 130
            },
            shadeMode: false,
            closed: false,
        },
    },
    enableDoubleSizeMode: false,
});

webamp.renderWhenReady(document.getElementById("app"));