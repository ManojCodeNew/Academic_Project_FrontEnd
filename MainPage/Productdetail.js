let productID = {
    Id: localStorage.getItem('shopId')
}

let products = [];
let added_products = [];
window.addEventListener('load', async () => {


    let response = await (await fetch('http://localhost/BACKEND/USER/Productdetails.php?type=products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productID)
    })
    ).json();
    products.push(response);
    let product_display_container = document.querySelector('.Product_display_container');

    products[0].forEach((product, index) => {
        let shop_name = document.querySelector('.shop_name');
        shop_name.innerHTML = product.shopname;
        let product_card = document.createElement('div');
        product_card.id = "product_card";

        let product_img_container = document.createElement('div');
        product_img_container.id = "product_img_container";

        let product_img = document.createElement('img');
        product_img.id = "product_img";
        product_img.src = product.product_url;


        // product details container
        let product_details = document.createElement('div');
        product_details.id = "product_details";


        let product_name = document.createElement('h3');
        product_name.id = "product_name";
        product_name.innerHTML = product.productname;

        let product_price = document.createElement('h4');
        product_price.id = "product_price";
        product_price.innerHTML = "Rs. " + product.price;

        let product_desc = document.createElement('p');
        product_desc.id = "product_desc";
        product_desc.innerHTML = product.product_desc;

        // Product adding container
        let product_action_container = document.createElement('div');

        product_action_container.id = "product_action_container";
        let product_qty_label = document.createElement('div');
        product_qty_label.innerHTML = "QTY";
        product_qty_label.className = "product_qty_label";
        let product_qty = document.createElement('input');
        product_qty.id = "product_qty";
        product_qty.value = "1";
        product_qty.type = "number";
        product_qty.min = "1";

        // Add btn
        let product_btn = document.createElement('button');
        product_btn.className = "product_btn";
        product_btn.id = index;
        product_btn.innerHTML = "Add";
        product_btn.onclick = product_add_remove;

        // Remove btn

        // product_display_container.appendChild(shop_name);
        product_display_container.appendChild(product_card);

        product_card.appendChild(product_img_container);
        product_img_container.appendChild(product_img);

        product_card.appendChild(product_details);

        product_details.appendChild(product_name);
        product_details.appendChild(product_price);
        product_details.appendChild(product_desc);

        product_card.appendChild(product_action_container);
        product_action_container.appendChild(product_qty_label);
        product_action_container.appendChild(product_qty);
        product_action_container.appendChild(product_btn);





        function product_add_remove() {
            if (product_btn.innerHTML == "Add") {

                // Adding process
                let Total_product_price = product.price * product_qty.value;
                let add_product_obj = {
                    productName: product.productname,
                    productQty: product_qty.value,
                    productPrice: Total_product_price,
                    shopId: product.sid,
                    productId: product_btn.id

                };
                added_products.push(add_product_obj);
                product_btn.innerHTML = "Remove";

            } else if (product_btn.innerHTML == "Remove") {
                let index = added_products.findIndex(item => item.productId == product_btn.id);
                added_products.splice(index, 1);
                product_btn.innerHTML = "Add";

            }
            // Order btn and ordered product length
            let product_length = document.querySelector('.product_length');
            product_length.innerHTML = added_products.length;


            
        }


    });

    
})
// order btn action
let order_btn = document.querySelector('.order_btn');
// order_btn.onclick=order_btn_click;

// function order_btn_click() {
//     alert();
// }
