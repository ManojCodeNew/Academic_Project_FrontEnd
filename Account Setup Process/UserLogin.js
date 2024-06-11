
let formtag = document.querySelector('.login_form');

// Access user email and password
formtag.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Formdata object used to get the input data and access the data based on the 'name' attribute .
    const form_data = new FormData(e.target);
    const entry = Object.fromEntries(form_data.entries());
    let user_login_data = {
        user_email: entry.user_email,
        user_password: entry.user_password
    }

    let response = await (await fetch('http://localhost/BACKEND/User/UserLogin.php?type=user_login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_login_data)
    })
    ).json();
    if (response) {
        if (response.uid) {
            alert("Login Success");
            window.location.href = "http://127.0.0.1:5500/MainPage/LandingPage.html?user_id=" + response.uid;

        } else {
            alert("Email and password is not found");
        }

    }
    console.log(response);

})
