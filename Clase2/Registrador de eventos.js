class TicketManager{
    #precioBaseDeGanancia = 0.2;
    #eventos = [];

    constructor(){
        this.id=0
    }

    agregarEvento(nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()){
        this.id +=1;
        const participantes = [];

        const evento = {
            id: this.id,
            nombre: nombre,
            lugar: lugar,
            precio: precio,
            capacidad: capacidad,
            fecha: fecha,
            participantes: participantes
        }

        this.#eventos.push(evento);

        return `Evento creado con ${this.id}`;
    }

    agregarUsuario(idEvent, idUsuario){
        
    }
}

const manejadorDeEventos = new TicketManager();

const nombreEvento = "Evento Argentina";
const lugar = "Argentina";
const precio = 600;