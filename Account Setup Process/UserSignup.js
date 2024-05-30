let form=document.querySelector(".Signup_form");
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const form_data=new FormData(e.target);
    const entry=Object.fromEntries(form_data.entries());
    const User_signup_data={
        user_name:entry.user_name,
        user_email:entry.user_email,
        user_password:entry.user_password
    }

    let response = await (await fetch('http://localhost/BACKEND/Admin_signup.php?type=user_signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(User_signup_data)
    })
    ).json();
    if (response) {
        if (response.id) {
        alert("created successfully");
            // window.location.href="http://127.0.0.1:5501/dashboard.html?admin_id="+response.id;
        }else{
            alert("Email and password is invalid");
        }
        
    }
    console.log(response);
    

})