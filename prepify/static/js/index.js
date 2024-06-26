// we can access camera audio and video using mediaDeviceAPI
function openTestWindow(){
    window.location.href = "/taketest";
}
function openDashboard(){
    window.location.href = "/dashboard";
}

function openNavigation(){
    let navDiv = document.getElementById("mobileNavDiv");
    navDiv.classList.toggle("fullheingNavigation");
}