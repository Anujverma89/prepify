let currentForm = "login"
function opensignUpform(){
    let msgbox = document.getElementById("messagebox");
    let textbox = document.getElementById("clicktoopentext");
    let loginform = document.getElementById("LoginForm");
    let signupform = document.getElementById("SignupForm");
    if(currentForm === "login"){
        msgbox.innerText = " ";
        textbox.innerText = "Login"
        loginform.classList.add("hidden_form");
        signupform.classList.remove("hidden_form");
        currentForm = "signup";
    }else{
        msgbox.innerText = " ";
        textbox.innerText="Singup";
        console.log(textbox);
        loginform.classList.remove("hidden_form");
        signupform.classList.add("hidden_form");
        currentForm = "login";
    }
}

function checkPassword(){
    let msgbox = document.getElementById("messagebox");
    let pass = document.getElementById("pass").value;
    let cpass = document.getElementById("cpass").value;
    let btn = document.getElementById("submitbutn");
    if (pass === cpass){
        msgbox.innerText=" ";
        btn.classList.add("activebutton");
        btn.disabled = false;
    }else{
        msgbox.innerText = "Password and confirm Password didn't match Re-enter"
        btn.classList.remove("activebutton");
        btn.disabled = true;
    }
}

window.onload = ()=>{
    let msgbox = document.getElementById("messagebox");
    let current = document.getElementById("whichcurrent").innerText;
    let textbox = document.getElementById("clicktoopentext");
    let loginform = document.getElementById("LoginForm");
    let signupform = document.getElementById("SignupForm");
    console.log(current);
    if(current === "login"){
        textbox.innerText="Singup";
        loginform.classList.remove("hidden_form");
        signupform.classList.add("hidden_form");
        currentForm = "login";
    }else if(current === "signup"){
        textbox.innerText = "Login"
        loginform.classList.add("hidden_form");
        signupform.classList.remove("hidden_form");
        currentForm = "signup";
    }
}





// document.addEventListener("DOMContentLoaded",()=>{
//     let loginform = document.getElementById("LoginForm");
//     let signupform = document.getElementById("SignupForm");
//     signupform.addEventListener("submit",(e)=>{
//        console.log(e); 
//        e.preventDefault();
//     })
//     loginform.addEventListener("submit", (e)=>{
//         console.log(e.target.data); 
//         e.preventDefault();
//     })
// })
