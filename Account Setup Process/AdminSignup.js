let form=document.querySelector(".Admin_signup_form");
form.addEventListener('submit',async (e)=>{
    e.preventDefault();

    // Form data getting 
    const form_data=new FormData(e.target);
    const entry=Object.fromEntries(form_data.entries());
    const Admin_signup_data={
        admin_name:entry.admin_name,
        admin_email:entry.admin_email,
        admin_password:entry.admin_password
    }

    let response = await (await fetch('http://localhost/BACKEND/Admin/Admin_signup.php?type=admin_signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Admin_signup_data)
    })
    ).json();
    if (response) {
        if (response.id) {
        
            window.location.href="http://127.0.0.1:5500/Admin%20Panel/dashboard.html?admin_id="+response.id;
        }else{
            alert("Email and password is invalid");
        }
    }
    console.log(response);
    

})