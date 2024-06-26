function openNavigation(){
    let sideDiv = document.getElementById("sidepannel");
    sideDiv.classList.toggle("newsidepannel");
}

function deleteItem(curitem){
    let confirmresult = confirm("Do you want to delete ?");
    if (confirmresult){
        let xhr = new XMLHttpRequest();
        xhr.open("POST","/delterecord",true);
        let formdata = new FormData();
        formdata.append("id",curitem.dataset.id)
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    alert("Record Deleted Successfully");
                    window.location.reload();
                }else{
                    alert("Something went wrong please try after sometime");
                }
            }
        }
        xhr.send(formdata);
    }else{
        console.log("Don't see here");   
    }
}