
let shop_details_feilds = document.querySelector('.Shopdetails_body');
let product_display_root_container = document.querySelector(".product_display_root_container");
let products_action = document.querySelector('.products_action');
let product_add_form = document.querySelector(".add_product_form");

function shopdetails_click_handle() {
    shop_details_feilds.style.display = "block";
    products_action.style.display = "none";


}
function productdetails_click_handle() {
    product_display_root_container.style.display = "block"
    products_action.style.display = "block";
    shop_details_feilds.style.display = "none";
    product_add_form.style.display = "none";
}