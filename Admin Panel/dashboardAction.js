

// New Product adding button click handle
function product_add_btn_clicked() {
    let product_action = document.querySelector(".products_action");
    let product_add_form = document.querySelector(".add_product_form");
    let product_display_root_container = document.querySelector(".product_display_root_container");

    product_action.style.display = "block";
    product_add_form.style.display = "block";
    product_display_root_container.style.display = "none";

}


//Submit Button Proccess
function product_submit_handle() {
    let productdetails_btn_container = document.querySelector('.productdetails_btn_container');
    productdetails_btn_container.click();
}


// Accessing product details value

let product_details_form = document.querySelector('.product_details_form');
product_details_form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const input = Object.fromEntries(form_data.entries());

    let product_data_container = {
        product_id: localStorage.getItem('admin_id'),
        product_name: input.pname_input,
        product_price: input.price_input,
        product_desc: input.desc_input,
        product_img: input.product_img_input,
    }

    let response = await (await fetch("http://localhost/backend/ADMIN/Admin_action/Productdetails.php?type=add_product", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product_data_container)
    })
    ).json();

console.log(response);

})

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