const form = document.getElementById("loginForm");
const productsLink = document.getElementById("productsLink")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);

    const url = "/auth";
    const headers = {
        "Content-Type": "application/json"
    }
    const method = "POST";
    const body = JSON.stringify(obj);

    fetch(url, {
        headers,
        method,
        body
    })
    .then(response => response.json())
    //.then(productsLink.click())
    .then(data => {
        if(data.message == "El ususario y/o contraseña son incorrectos"){
            return console.log(data)
        }
        //console.log("no")
        productsLink.click();
        }
    )
    .catch(error => console.log(error))
    //setTimeout(()=>{productsLink.click()}, 1000);
    
})