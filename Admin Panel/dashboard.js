
const urlObj = new URL(window.location.href);
const query = new URLSearchParams(urlObj.search);
const logout_status = query.get('logout');


// Logout process
function logout() {
    let logout_conformation = window.confirm('Are you sure you want to log out?');
    if (logout_conformation) {
        window.location.href = "http://127.0.0.1:5500/Admin%20Panel/dashboard.html?logout=1";
        localStorage.clear();
    }

}
// logout Check
if (logout_status == 1) {
    window.location.href = "http://127.0.0.1:5500/Account%20Setup%20Process/AdminLogin.html";
} else {
    // Getting URL data 
    const urlObj = new URL(window.location.href);
    const query = new URLSearchParams(urlObj.search);
    const query_admin_id = query.get('admin_id');

    // Check localstorage precense  (it checks at the beggining if  localStorage have already data  I will consider this privious one so i can clear() localstorage then i store fresh value)
    let localStorage_presence = localStorage.getItem('admin_id');
    if (localStorage_presence) {
        console.log("locaStorage", localStorage_presence);
        //Clear LocalStorage
        localStorage.clear();
        window.location.reload();
        // window.location.href="http://127.0.0.1:5500/Account%20Setup%20Process/AdminLogin.html";

    }
    else {
        // Store id to the localstorage
        localStorage.setItem('admin_id', query_admin_id);
    }
    
}
// Access localstorage data
let localstorage_admin_id = localStorage.getItem('admin_id');

let shop_owner_name_container = document.querySelector(".shop_owner_name");
let shop_profile_img_container = document.querySelector(".profile_img");

    window.addEventListener('load', async ()=>{
        const admin_id_container = {
            admin_id: localstorage_admin_id
        };

        let dashboard_backend_response = await (await fetch('http://localhost/BACKEND/Admin/dashboard.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin_id_container)
        })
        ).json();

        // console.log("backend sended data", dashboard_backend_response);
        if (dashboard_backend_response.msg) {

            shop_owner_name_container.innerHTML = "User";
            console.log(dashboard_backend_response);
            localStorage.setItem('shop', '0');

        } else {
            // Shop presence set
            localStorage.setItem('shop', '1');

            // Storing Shop details to the localstorage
            localStorage.setItem('shopdetails', JSON.stringify(dashboard_backend_response));
            shop_owner_name_container.innerHTML = dashboard_backend_response['shopdetails'][0].ownername;
            shop_profile_img_container.src = dashboard_backend_response['shopdetails'][0].logoUrl;
        }
        console.log("HAi");
        console.log("dashboard", dashboard_backend_response);
    
    });






