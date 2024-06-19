

// New Product adding button click handle
function product_add_btn_clicked() {
    let product_action = document.querySelector(".products_action");
    let product_add_form = document.querySelector(".add_product_form");
    let product_display_root_container = document.querySelector(".product_display_root_container");

    product_action.style.display = "block";
    product_add_form.style.display = "block";
    product_display_root_container.style.display = "none";
    // productdetails_click_handle().reset();
    

}


//Submit Button Proccess
// *Note: this asynchronus function will help to asynchronusly call the function
async function product_submit_handle() {
    let productdetails_btn_container = document.querySelector('.productdetails_btn_container');
    productdetails_btn_container.click();
    setTimeout(fetchUpdatedProductData, 1000); 
}
// Refreshing 
store_products();


// Accessing product details value
function store_products() {
let product_details_form = document.querySelector('.product_details_form');
product_details_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const input = Object.fromEntries(form_data.entries());
    // image uplaod to the server
    let productImg=await upload(form_data,"product_image_upload");
    let productImgUrl=productImg.productImg;


    let product_data_container = {
        product_id: localStorage.getItem('admin_id'),
        product_name: input.pname_input,
        product_price: input.price_input,
        product_desc: input.desc_input,
        product_img:productImgUrl,
    }

    let response = await (await fetch("http://localhost/backend/ADMIN/Admin_action/Productdetails.php?type=add_product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product_data_container)
    })
    ).json();
    // It reset() is make every time new data will be store 
    product_details_form.reset();
console.log("product response",response);

})
}

// product_submit_handle button clicking section 
function reload() {
    localStorage.setItem('product', '0');
    if (localStorage.getItem('product') == '0') {
        window.location.reload();
        localStorage.removeItem('product');

    }
    productdetails_btn_container.click();

}

//*NOTE: The use of foreign key in shopdetails sid when user can directly come to product details section without creating shop then it give error so it will help.