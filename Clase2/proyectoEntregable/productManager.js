class ProductManager {
    products = [];
    
    constructor(){
        this.id= 0;
    }
    
    //Método para agregar productos
    addProduct(title, description, price, thumbail, code, stock){
        this.id +=1

        const producto = {
            id: this.id,
            title,
            description,
            price,
            thumbail,
            code,
            stock
        }

        //Validaciones
        let repetido = this.products.find( c => c.code == code);
        if(repetido){
            return `El code ya existe`;
        }
        if(!title || !description || !price || !thumbail || !code || !stock){
            return `Faltan datos`;
        }

        //Agregar producto a products
        this.products.push(producto);

        return `Producto agregado con id: ${this.id}`;
    }
    
    //Método para obtener el arreglo products
    getProducts(){
        return this.products;
    }
    
    //Método para obtener un producto por id
    getProductById(i){
        let producto = this.products.find( p => 
            p.id == i
        );

        if(producto){
            return producto;
        } else {
            return `Not found`;
        }
    }
};

const manejadorDeProductos = new ProductManager();

console.log(manejadorDeProductos.addProduct("agua", "bebida", 100, "url", "code", 1000));
console.log(manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code", 9000));
console.log(manejadorDeProductos.getProducts());
console.log(manejadorDeProductos.getProductById(10));
