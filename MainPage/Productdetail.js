let productID = {
    Id: localStorage.getItem('shopId')
}
window.addEventListener('load', async () => {


    let response = await (await fetch('http://localhost/BACKEND/USER/Productdetails.php?type=products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productID)
    })
    ).json();
    console.log(response);
    let product_display_container = document.querySelector('.Product_display_container');
    response.forEach((product) => {
        let shop_name = document.createElement('h3');
        shop_name.innerHTML= product.shopname;

        let product_card = document.createElement('div');
        product_card.id = "product_card";

        let product_img=document.createElement('img');
        product_img.id = "product_img";
        product_img.src=product.product_url;

        let product_details=document.createElement('div');
        let product_name=document.createElement('h3');
        product_name.id="product_name";
        product_name.innerHTML=product.productname;
        
        let product_price=document.createElement('h4');
        product_price.id="product_price";
        product_price.innerHTML="Rs. "+product.price;
        
        product_display_container.appendChild(shop_name);
        product_display_container.appendChild(product_card);
        product_card.appendChild(product_img);
        product_card.appendChild(product_details);

        product_details.appendChild(product_name);
        product_details.appendChild(product_price);




console.log(product);
    });
})

