
let shop_details_feilds = document.querySelector('.Shopdetails_body');
let product_display_root_container = document.querySelector(".product_display_root_container");
let products_action = document.querySelector('.products_action');
let product_add_form = document.querySelector(".add_product_form");
let shop_view_root_container = document.querySelector('.shop_view_root_container');
let shop_view_container = document.querySelector('.shop_view_conatiner');

function shopdetails_click_handle() {

    // closing product details element while clicking to the shop button
    product_display_root_container.style.display = "none"
    products_action.style.display = "none";
    shop_view_root_container.style.display = "block";

    // Check shop is their or not 
    if (localStorage.getItem('shop') == '1') {
        // shop_details_retrive_to_the_localStorage
        let Shop_details_container = JSON.parse(localStorage.getItem('shopdetails'));

        if (!document.getElementById("shop_displayed")) {
            shop_view_container.id = "shop_displayed";
            shop_view_container.style.display = "block";
            let shop_img_container = document.createElement('img');
            shop_img_container.className = "shop_img_container";
            shop_img_container.src = Shop_details_container['shopdetails'][0].ShopImgurl;
            shop_view_container.appendChild(shop_img_container);

            // Shop name display
            let shop_name_container = document.createElement('h3');
            shop_name_container.innerHTML = Shop_details_container['shopdetails'][0].shopname;
            shop_name_container.className = "shop_name_container";
            shop_view_container.appendChild(shop_name_container);


            // Shop Delete Button

            let shop_delete_button = document.createElement('button');
            shop_delete_button.className = "shop_delete_button";
            shop_delete_button.innerHTML = "Delete";
            shop_view_root_container.appendChild(shop_delete_button);
            console.log(shop_view_container);



            // shop_delete_handle() function call
            shop_delete_button.addEventListener('click', async () => {
                // Adding delete mode
                localStorage.setItem('shop_delete', "1");

                let shop_id = {
                    deleting_shop_id: localStorage.getItem('admin_id')
                }

                let response = await (await fetch('http://localhost/BACKEND/ADMIN/ADMIN_ACTION/Shopdetails.php?type=delete_shop', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(shop_id)
                })
                ).json();
                if (response.status) {
                    if (localStorage.getItem('shop_delete') == "1") {
                        // localStorage.setItem('shop','0');
                        localStorage.removeItem('shop_delete');
                        window.location.reload();
                    }
                }

            })
        }
        else {
            // If 'shop_view_container' contain 'shop_displayed' then also you show shop
            shop_view_container.style.display = "block";

        }

    } else {
        shop_details_feilds.style.display = "block";
        products_action.style.display = "none";
        shop_view_container.style.display = "none";
    }


}


async function productdetails_click_handle() {
    // If shop is not present then it alert
    if (localStorage.getItem('shop') == '0') {
        alert("Please create your shop");
    }
    else {

        product_display_root_container.style.display = "block";
        products_action.style.display = "block";
        shop_details_feilds.style.display = "none";
        product_add_form.style.display = "none";
        shop_view_container.style.display = "none";
        shop_view_root_container.style.display = "none";
    }
    fetchUpdatedProductData();

}

// Send request to the backend to access updated products
async function fetchUpdatedProductData() {

    let shop_data = {
        shop_id: localStorage.getItem('admin_id')
    }
    let backend_response = await (await fetch('http://localhost/backend/ADMIN/Admin_action/Productdetails.php?type=product', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shop_data)
    })
    ).json();

    product_display_root_container.style.display = "block";
    products_action.style.display = "block";
    backend_response.forEach((products) => {
        let Productdetails_display_container = document.querySelector('.product_display_root_container');
        let product_display = document.createElement('div');
        product_display.className="product_display";
        let product_img = document.createElement('img');
        product_img.width="20";
        product_img.height="20";

        let product_price = document.createElement('h5');
        let Product_name = document.createElement('h4');

        let product_desc = document.createElement('div');
        product_desc.className="product_desc";
        let product_delete_btn_container=document.createElement('div');
        product_delete_btn_container.className="delete_btn_container";
        let product_delete_btn=document.createElement('h5');
        product_delete_btn.className="delete_btn";
        product_delete_btn.innerHTML="Delete";
        

        product_img.src=products.product_url;

        Product_name.innerHTML = products.productname;

        product_price.innerHTML=products.price;

        product_desc.innerHTML=products.product_desc;

        Productdetails_display_container.appendChild(product_display);
        product_display.appendChild(product_img);
        product_display.appendChild(Product_name);
        product_display.appendChild(product_price);
        product_display.appendChild(product_desc);
        product_display.append(product_delete_btn_container);
        product_delete_btn_container.appendChild(product_delete_btn);


        console.log(products);

    });

    localStorage.setItem("product", JSON.stringify(backend_response));
}

// Shop details form data
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
    let response = await (await fetch('http://localhost/BACKEND/ADMIN/ADMIN_ACTION/shopdetails.php?type=insert_shop', {
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

