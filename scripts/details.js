console.log("hello")
setTimeout(() => {
    window.location.href = "index.html";
}, 5000);
let seconds = 5;
const secondP = document.getElementById("seconds");
setInterval(() => {
    secondP.innerHTML = seconds + " seconds"
    seconds = seconds - 1
    console.log(seconds)
}, 900)