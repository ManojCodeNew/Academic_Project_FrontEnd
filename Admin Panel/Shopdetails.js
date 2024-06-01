
let shop_details_feilds = document.querySelector('.Shopdetails_body');
let product_display_root_container = document.querySelector(".product_display_root_container");
let products_action = document.querySelector('.products_action');
let product_add_form = document.querySelector(".add_product_form");
let shop_view_container = document.querySelector('.shop_view_conatiner');

function shopdetails_click_handle() {
    // closing product details element while clicking to the shop button
    product_display_root_container.style.display = "none"
    products_action.style.display = "none";

    // Check shop is their or not 
    if (localStorage.getItem('shop') == '1') {
        // shop_details_retrive_to_the_localStorage
        let Shop_details_container = JSON.parse(localStorage.getItem('shopdetails'));

        if (!document.getElementById("shop_displayed")) {
            shop_view_container.id = "shop_displayed";
            shop_view_container.style.display = "block";
            let shop_img_container = document.createElement('img');
            shop_img_container.className = "shop_img_container";
            // shop_img_container.id = "1";
            shop_img_container.src = Shop_details_container.ShopImgurl;
            shop_view_container.appendChild(shop_img_container);

            // Shop name display
            let shop_name_container = document.createElement('h3');
            // shop_name_container.id = "1";
            shop_name_container.innerHTML = Shop_details_container.shopname;
            shop_name_container.className = "shop_name_container";
            shop_view_container.appendChild(shop_name_container);

            console.log(shop_view_container);
        }
        else{
            // If 'shop_view_container' contain 'shop_displayed' then also you show shop
            shop_view_container.style.display = "block";
        
        }

    } else {
        shop_details_feilds.style.display = "block";
        products_action.style.display = "none";
        shop_view_container.style.display="none";
    }


}

function productdetails_click_handle() {
    product_display_root_container.style.display = "block"
    products_action.style.display = "block";
    shop_details_feilds.style.display = "none";
    product_add_form.style.display = "none";
    shop_view_container.style.display="none";
}




let shop_details_form = document.querySelector('#SD_Form');
shop_details_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Formdata object used to get the input data and access the data based on the 'name' attribute .
    const form_data = new FormData(e.target);
    const entry = Object.fromEntries(form_data.entries());
    // if (((entry.Start_time && entry.End_time>= 1) && (entry.Start_time && entry.End_time <=12)) && ((entry.Start_minutes && entry.End_minutes>= 1) && (entry.Start_minutes && entry.End_minutes <=60))) {
    // let Start_Time=entry.Start_time+" : "+entry.Start_minutes+"  "+entry.Start_AMPM;
    // let End_Time=entry.End_time+" : "+entry.End_minutes+"  "+entry.End_AMPM;
    // console.log(Start_Time+" - "+End_Time);

    // }else{
    //     alert("Invalid Time");

    // }
    let Start_Time = entry.Start_time + " : " + entry.Start_minutes + "  " + entry.Start_AMPM;
    let End_Time = entry.End_time + " : " + entry.End_minutes + "  " + entry.End_AMPM;


    // Shop id access to the localstorage
    let admin_id = localStorage.getItem('admin_id');
    let shop_details_form_data = {
        shop_id: admin_id,
        shop_name: entry.sname,
        shop_owner_name: entry.Oname,
        shop_category: entry.Category,
        shop_location: entry.Location,
        shop_timings: Start_Time + " - " + End_Time,
        shop_imgUrl: entry.ImgUrl,
        shop_logoUrl: entry.logoUrl,
        shop_contact_details: entry.contactdetails,
        shop_email: entry.email,
    }
    let response = await (await fetch('http://localhost/BACKEND/ADMIN/ADMIN_ACTION/shopdetails.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shop_details_form_data)
    })
    ).json();
    if (response) {

        localStorage.setItem('shop', '1');
        localStorage.setItem('shop_presence', "true");
        if (localStorage.getItem('shop_presence') == "true") {
            window.location.reload();
            localStorage.removeItem('shop_presence');
        }
    }

    console.log(response);
})