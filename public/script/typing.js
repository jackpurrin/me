var i = 0;
var txt = "jackpurrin's internet cafe"; /* The text */
var speed = 50; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("type").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
