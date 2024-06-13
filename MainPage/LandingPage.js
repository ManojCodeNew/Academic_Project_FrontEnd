// Access url user id  and stotre to the localstorage
const urlObj = new URL(window.location.href);
const query = new URLSearchParams(urlObj.search);
const query_user_id = query.get('user_id');
localStorage.setItem('user_id', query_user_id);



// Body alterations
let shop_container = document.querySelector(".shop_container");
let emptyShop = "https://images.unsplash.com/photo-1604066867775-43f48e3957d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHN0b3JlfGVufDB8fDB8fHww";
// body_container.innerHTML="Welcome to LSC";

let shopdata = [];
// if (shopdata.length==0) {
//     alert("Loading...");
// }else{
// }


let Url = "http://localhost/BACKEND/USER/ALLshopdata.php";

// Fetch all data
window.addEventListener('load', async () => {
    let response = await fetch(Url);
    let json_response = await response.json();
    shopdata.push(json_response);
    shopdata[0].forEach((shop) => {
        console.log(shop);
        let shop_card = document.createElement('div');
        shop_card.className = "shop_card";
        shop_card.id = shop.sid;

        let shop_img = document.createElement('img');
        shop_img.src = (shop.ShopImgurl) ? shop.ShopImgurl : emptyShop;
        shop_img.className = "shop_img";

        let shop_name = document.createElement('h4');
        shop_name.className = "shop_name";
        shop_name.innerHTML = shop.shopname;

        let shop_category = document.createElement('p');
        shop_category.className = "shop_category";
        shop_category.innerHTML = shop.Shop_category;

        let shop_location = document.createElement('p');
        shop_location.className = "shop_location";
        shop_location.innerHTML = shop.Location.slice(0, 25) + "...";

        shop_container.appendChild(shop_card);
        shop_card.appendChild(shop_img);
        shop_card.appendChild(shop_name);
        shop_card.appendChild(shop_category);
        shop_card.appendChild(shop_location);

        // Shop click handle
        shop_card.addEventListener('click', async () => {
            let clicked_shop_id = shop_card.id;
            localStorage.setItem('shopId', clicked_shop_id);
            localStorage.setItem('shopName',shop.shopname);
            localStorage.setItem('shopCategory',shop.Shop_category);
            localStorage.setItem('shopAddress',shop.Location);
            localStorage.setItem('shopContactDetails',shop.contactDetails);
            localStorage.setItem('shopTimings',shop.Timing);



            window.location.href = "Productdetail.html";
        })
    });
// }
    // console.log(shopdata);

})

let user={
    user_id:localStorage.getItem('user_id')
}
let userData_url = "http://localhost/BACKEND/USER/Userdatafetch.php";
window.addEventListener('load', async () => {
    let response = await (await fetch(userData_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(user),
    })
    ).json();
let i=0;
console.log("RESPONSE= ",response,"=",i+1);
})



 