let videostream;
let mediaRec;
let recognition;
let speechSynth;
let a = " ";
let milli=0;
let second=0;
let min=0;
let firstListen = 1;
let StopNow=0;
function doInitialSetUp(){
    let output = document.getElementById('output');
    if(window.SpeechRecognition || window.webkitSpeechRecognition){
        recognition = window.SpeechRecognition? new SpeechRecognition() : new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.addEventListener("audiostart",()=>{
           if(firstListen === 1){
                output.classList.remove("displayNone");
                output.classList.add("output")
                output.innerText = "Listening...";
                firstListen = 0;
           }
        })
        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            a +=" " + transcript;
            document.getElementById('output').innerText = a;
            console.log(a);
        };

        recognition.onend = function(event){
            if(StopNow === 1){
                console.log("stopping");
            }else{
                recognition.start();
            }
        }

        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            let videotab = document.getElementById("videotab");
            let audiotab = document.getElementById("audiotab");
            navigator.mediaDevices.getUserMedia({video:true,audio:true}).
            then((stream)=>{
                videotab.srcObject = stream;
                videostream=stream;
            }).catch((err)=>{
                console.log(err);
            });
        }else{
            alert("Upgrade to new device your device doesnot support media and recording");
        }
    }else{
        alert("Speech recognition is not supported by your borwser swtich to chrome or edge or safari ")
    }
    
}

function nextMove(){
    let text = document.getElementById("identificationText");
    let dept = document.getElementById("departmentoptinos");
    let showTestType = document.getElementById("selectTestType");
    dept.classList.add("displayNone");
    text.innerText = "Select type of Test";
    showTestType.classList.remove("displayNone")
}

function openTest(cur){
    let deptDiv = document.getElementById("departmentContainer");
    
    let curtype = cur.dataset.type;
    if(curtype==="Mock"){
        doInitialSetUp();
        deptDiv.classList.add("displayNone");
    }else if(curtype === "Apt"){
        window.open("https://www.interviewbit.com/", "_blank");
    }else if(curtype === "Tech"){
        window.open("https://www.hackerrank.com/", "_blank");
    }
}


let chunk =[];
function recordVideo(){
    if(StopNow === 1){
        window.location.reload();
    }
    let mikeIcon = document.getElementById("mikeIcon");
    mikeIcon.classList.add("listeningIcong");
    let startReco = document.getElementById("record-answer");
    startReco.innerText="Recording";
    let hiddenbutton = document.getElementById("stop-recording");
    hiddenbutton.hidden=false;
    const options = {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        mimeType: 'video/webm',
      };
    mediaRec = new MediaRecorder(videostream ,options);
   
    mediaRec.ondataavailable = (e) => {
        chunk.push(e.data);
    };
    recognition.start();
    mediaRec.start();

    setInterval(()=>{
        let sec = document.getElementById("second");
        sec.innerText = ++second;
        if(second === 60){
            second=0;
            let minu = document.getElementById("minute");
            minu.innerText = ++min;
        }
    },1000)
    
}


function startProcessing(){
    let startReco = document.getElementById("record-answer");
    let processText = document.getElementById("processanswer");
    startReco.innerText="Start Test";
    let hiddenbutton = document.getElementById("stop-recording");
    document.getElementById("second").innerText="00";
    document.getElementById("minute").innerText="00";
    hiddenbutton.hidden=true;
    StopNow = 1;
    mediaRec.onstop = () => {
        const data = new Blob(chunk, { type: 'video/webm' });
        const datad = URL.createObjectURL(data);
        let conf = confirm("Do you want to save this video?");
        if(conf === true){
            let a = document.createElement("a");
            a.setAttribute("href",datad);
            a.setAttribute("download","videobox");
            a.click();
            if( document.getElementById("loginIdentifer")){
                processText.click()
            }else{
                loginWhileTest();
            }
        }else{
            if( document.getElementById("loginIdentifer")){
                processText.click()
            }else{
                loginWhileTest();
            }
        }
       
    };
    setTimeout(() => {
        mediaRec.stop();
    }, 100);
}

function loginWhileTest(){
    let output = document.getElementById('output');
    let context = document.getElementById("question");
    var selectedIndex = context.selectedIndex;
    var selectedOption = context.options[selectedIndex];
    var selectedcontext = selectedOption.label;
    window.localStorage.setItem("AnswerText",output.innerText);
    window.localStorage.setItem("context",selectedcontext);
    window.open("/login");
}

function exitSelection(){
    window.location.href="/"
}