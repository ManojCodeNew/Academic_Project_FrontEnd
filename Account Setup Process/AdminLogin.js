
let formtag = document.querySelector('.login_form');

// Access user email and password
formtag.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Formdata object used to get the input data and access the data based on the 'name' attribute .
    const form_data = new FormData(e.target);
    const entry = Object.fromEntries(form_data.entries());
    let data = {
        admin_email: entry.admin_email,
        admin_password: entry.admin_password
    }

    // Send data to the Backend
    let response = await (await fetch('http://localhost/BACKEND/Admin/Admin_login.php?type=admin_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    ).json();
    if (response) {
        if (response.id) {
            window.location.href = "http://127.0.0.1:5500/Admin%20Panel/dashboard.html?admin_id=" + response.id;
        } else {
            alert("Email and password is not found");
        }
    }
    console.log(response);

})
