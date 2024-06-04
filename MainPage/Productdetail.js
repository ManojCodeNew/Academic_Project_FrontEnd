let productID={
    Id:localStorage.getItem('shopId')
}
window.addEventListener('load',async()=>{


let response = await (await fetch('http://localhost/BACKEND/USER/Productdetails.php?type=products', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(productID)
})
).json();
console.log(response);
})
// document.body.append(document.createElement('h1').innerHTML=localStorage.getItem('shopId'));