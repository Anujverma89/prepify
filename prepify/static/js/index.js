
//opening test window 
document.addEventListener("DOMContentLoaded",()=>{

})


// we can access camera audio and video using mediaDeviceAPI
function openTestWindow(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        
    }else{
        alert("Upgrade to new device your device doesnot support media and recording");
    }
}