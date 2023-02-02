const socket = io();
//socket.emit("message", "¡Hola desde socket");

/*socket.on("mes", data => {
    console.log(data);
})*/
//console.log("funciona");

const res = document.getElementById("res");
const user = document.getElementById("user");
const text = document.getElementById("text");


document.addEventListener("keydown", (e) => {
    socket.id = user.value;
    //console.log(e.key);
    
    if(e.key === "Enter"){
        socket.emit("message", `User ${socket.id}: ${text.value}`);
        text.value = "";
    }
});

socket.on("mensajeGrupal", data => {
    console.log(data);
    let newMessage = "";
    data.forEach( message => {
        newMessage += message + "</br>";
    })
    res.innerHTML = newMessage;
});