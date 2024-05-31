// New Product adding
function product_add_btn_clicked() {
    let product_action = document.querySelector(".products_action");
    let product_add_form = document.querySelector(".add_product_form");
    let product_display_root_container=document.querySelector(".product_display_root_container");
    
    product_action.style.display = "block";
    product_add_form.style.display = "block";
    product_display_root_container.style.display = "none";
}

// Product add Submit Button Proccess
function product_submit() {
    let product_action = document.querySelector(".products_action");
    let product_add_form = document.querySelector(".add_product_form");
    let product_display_root_container=document.querySelector(".product_display_root_container");
    
product_action.style.display = "block";
product_add_form.style.display = "none";
product_display_root_container.style.display = "block";

}