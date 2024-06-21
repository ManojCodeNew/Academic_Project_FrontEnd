
function showNotification(type,msg) {
   
    let popup_notification=document.querySelector('.popup_notification');
    let notification_txt=document.querySelector('.notification_txt');
    if (type=="success") {
        notification_txt.innerHTML=msg;
        popup_notification.style.backgroundColor="green";
        notification_txt.style.color="white";
    }
    else{
        notification_txt.innerHTML=msg;
        notification_txt.style.color="white";
        popup_notification.style.backgroundColor="#a70000";
    }
    popup_notification.classList.add('show');
    setTimeout(()=>{
        popup_notification.classList.remove('show');
    },3000);
}
        
        // window.onload= showNotification('error',"Saved Failed");