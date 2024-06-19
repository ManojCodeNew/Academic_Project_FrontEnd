
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
// Unique data storing purpose i can use set()
let products_data = new Set();
let Productdetails_display_container = document.querySelector('.product_display_root_container');

// Send request to the backend to access updated products
async function fetchUpdatedProductData() {
    product_display_root_container.innerHTML = '';
    // shop data send to recive the product data
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
    console.log("Backend Products response",backend_response);

    // clear the previous stored set() data and storing new fetched data
    products_data.clear();
    backend_response.forEach(products => {
        products_data.add(products);
    });

//  set() to array convert to show the products 
    let Unique_products = Array.from(products_data);
    console.log("set", Unique_products);
    product_display_root_container.style.display = "block";
    products_action.style.display = "block";


    let product_table=document.createElement('table');
    product_table.style.width="100%";
    product_table.style.borderCollapse="collapse";
    
    let product_head_row=document.createElement('tr');
    product_head_row.style.backgroundColor="white";

    let product_img_title=document.createElement('th');
    product_img_title.innerHTML="Image";
    product_img_title.style.border="1px solid gray";
    product_img_title.style.padding="8px";
    product_img_title.style.padding="15px";

    
    let product_name_title=document.createElement('th');
    product_name_title.innerHTML="Name";
    product_name_title.style.border="1px solid gray";
    product_name_title.style.padding="8px";
    
    let product_price_title=document.createElement('th');
    product_price_title.innerHTML="Price";
    product_price_title.style.border="1px solid gray";
    product_price_title.style.padding="8px";
    
    let product_desc_title=document.createElement('th');
    product_desc_title.innerHTML="Description";
    product_desc_title.style.border="1px solid gray";
    product_desc_title.style.padding="8px";
    
    let product_action_title=document.createElement('th');
    product_action_title.innerHTML="Action";
    product_action_title.style.border="1px solid gray";
    product_action_title.style.padding="8px";
    
    product_head_row.appendChild(product_img_title);
    product_head_row.appendChild(product_name_title);
    product_head_row.appendChild(product_price_title);
    product_head_row.appendChild(product_desc_title);
    product_head_row.appendChild(product_action_title);
    product_table.appendChild(product_head_row);
    

    Unique_products.reverse().forEach((product,id) => {

        let product_row=document.createElement('tr');
        product_row.style.backgroundColor="gray";
        product_row.style.border="1px solid #2a2a2a";


        let img_td=document.createElement('td');
        
        let product_img=document.createElement('img');
        product_img.src=product.product_url;
        product_img.width="55";
        product_img.height="60";
        product_img.style.marginLeft="10px";
        product_img.style.borderRadius="6px";


        
        // Name display
        let name_td=document.createElement('td');
        let product_name=document.createElement('h3');
        product_name.innerHTML=product.productname;
        product_name.style.marginLeft="10px";
        
        // Price display
        let price_td=document.createElement('td');
        let product_price=document.createElement('h5');
        product_price.innerHTML=product.price;
        product_price.style.marginLeft="10px";
        
        // Price display
        let desc_td=document.createElement('td');
        let product_desc=document.createElement('h5');
        product_desc.innerHTML=product.product_desc;
        product_desc.style.marginLeft="10px";
        
        // Action display
        let delete_td=document.createElement('td');
        delete_td.id=product.product_no;
        delete_td.style.textAlign="center";
        delete_td.style.border="1px solid #2a2a2a";



        let product_delete=document.createElement('h5');
        product_delete.innerHTML="Delete";
        product_delete.style.background="red";
        product_delete.style.padding="10px";
        product_delete.style.border="none";
        product_delete.style.borderRadius="10px";
        product_delete.style.display="inline-block";
        product_delete.style.marginLeft="10px";
        
        
        
        product_row.appendChild(img_td);
        img_td.appendChild(product_img);
        
        product_row.appendChild(name_td);
        name_td.appendChild(product_name);
        
        product_row.appendChild(price_td);
        price_td.appendChild(product_price);
        
        product_row.appendChild(desc_td);
        desc_td.appendChild(product_desc);
        
        product_row.appendChild(delete_td);
        delete_td.appendChild(product_delete);
        
        product_table.appendChild(product_row);
        delete_td.addEventListener('click', async () => {
            let delete_confirm = window.confirm("Are you sure you want to delete this product?");
            if (delete_confirm) {
        
        
                let deleted_product = {
                    product_id: delete_td.id
                }
                let product_delete_response = await (await fetch('http://localhost/backend/ADMIN/Admin_action/Productdetails.php?type=delete_product', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(deleted_product)
                })
                ).json();
                if (product_delete_response) {
                    let productdetails_btn_container = document.querySelector('.productdetails_btn_container');
                    productdetails_btn_container.click();
                    setTimeout(fetchUpdatedProductData, 1000);
                }
            }
        })
        Productdetails_display_container.appendChild(product_table);

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

    // Here i can call function using 'await' because when you can call asynchronus function then you can use this await to call that function otherwice it return promise
    let imgUrl=await upload(form_data,"shop_image_upload");
    let shopImgurl=imgUrl.shopimg;
    let shopLogoUrl=imgUrl.shoplogo;




    // Shop id access to the localstorage
    let admin_id = localStorage.getItem('admin_id');
    let shop_details_form_data = {
        shop_id: admin_id,
        shop_name: entry.sname,
        shop_owner_name: entry.Oname,
        shop_category: entry.Category,
        shop_location: entry.Location,
        shop_timings: displayTiming(entry),
        shop_imgUrl:shopImgurl ,
        shop_logoUrl: shopLogoUrl,
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
        console.log("rsponse", response);
        localStorage.setItem('shop', '1');
        localStorage.setItem('shop_presence', "true");
        if (localStorage.getItem('shop_presence') == "true") {
            window.location.reload();
            localStorage.removeItem('shop_presence');
        }
    }

    console.log(response);
})

async function upload(form_data,type) {
    let uploadResponse = await (await fetch('http://localhost/BACKEND/ADMIN/ADMIN_ACTION/upload.php?type='+type, {
        method: 'POST',
        body: form_data
    })
    ).json();
    if (type=="shop_image_upload") {
        let shopImgurl={
            shopimg:uploadResponse.shopImgPath,
            shoplogo:uploadResponse.logoImgPath
            }
            return shopImgurl;
    }
    if (type=="product_image_upload") {
        let productImgurl={
            productImg:uploadResponse.productImgPath,
            }
            return productImgurl;
    }
}

function displayTiming(time) {
    let open_Time = 0;
    let end_Time = 0;
    if (time.Start_time <= 12 && time.Start_minutes <= 60) {
        open_Time = time.Start_time + " : " + time.Start_minutes + "  " + time.Start_AMPM;
    }
    if (time.End_time <= 12 && time.End_minutes <= 60) {
        end_Time = time.End_time + " : " + time.End_minutes + "  " + time.End_AMPM;
    }
    return open_Time+" to "+end_Time;
}


