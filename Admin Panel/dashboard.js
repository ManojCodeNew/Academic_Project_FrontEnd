
// Getting URL data 
const urlObj = new URL(window.location.href);
const query = new URLSearchParams(urlObj.search);
const query_admin_id = query.get('admin_id');


let shop_owner_name_container = document.querySelector(".shop_owner_name");

window.addEventListener('load', async () => {
    const admin_id_container = {
        admin_id: query_admin_id
    };

    let dashboard_backend_response = await (await fetch('http://localhost/BACKEND/Admin/dashboard.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(admin_id_container)
    })
    ).json();

    console.log("backend sended data", dashboard_backend_response);
    if (dashboard_backend_response.msg) {
        shop_owner_name_container.innerHTML = "  \tUser";

    } else {
        shop_owner_name_container.innerHTML = dashboard_backend_response.ownername;
    }
});