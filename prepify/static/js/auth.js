let currentForm = "login"
function opensignUpform(){
    let textbox = document.getElementById("clicktoopentext");
    let loginform = document.getElementById("LoginForm");
    let signupform = document.getElementById("SignupForm");
    if(currentForm === "login"){
        textbox.innerText = "Login"
        loginform.classList.add("hidden_form");
        signupform.classList.remove("hidden_form");
        currentForm = "signup";
    }else{
        textbox.innerText="Singup";
        console.log(textbox);
        loginform.classList.remove("hidden_form");
        signupform.classList.add("hidden_form");
        currentForm = "login";
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
