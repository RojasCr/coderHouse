const fs = require("fs");

class ProductManager {
    products = [];
    
    constructor(){
        this.id = 0;
        this.path = "./files/products.json";
        this.type = "utf-8";
    }

    
    
    //Método para agregar productos
    addProduct(title, description, price, thumbail, code, stock){
        /*try{*/

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
            /*let resultado = await fs.promises.readFile(this.path, this.type);
            let resultadoObj = JSON.parse(resultado);
    
            let repetido = await resultadoObj.find( c => c.code == code);
            if(repetido){
                return `El code ya existe`;
            }
            if(!title || !description || !price || !thumbail || !code || !stock){
                return `Faltan datos`;
            }*/
    
            //Agregar producto a products
            this.products.push(producto);
            
            //Guardarlo en archivo json
            /*let productsStr = JSON.stringify(this.products);
            await fs.promises.appendFile(this.path, productsStr);
    */
    
            //return `Producto agregado con id: ${this.id}`;
        /*} catch (err){
            throw new Error(err);
        }*/

        
    }
    
    //Método para obtener el arreglo products
    async getProducts(){
        try{
            const resultado = await fs.promises.readFile("./files/products.json", "utf-8");
            const resultadoStr = resultado;
            const resultadoObj = JSON.parse(resultadoStr);
            console.log(resultadoObj);
        } catch (err) {
                throw new Error(err);
            
        }
    }
    
    //Método para obtener un producto por id
    async getProductById(i){
        try{
            let resultado = await fs.promises.readFile(this.path, this.type);
            let resultadoObj = await JSON.parse(resultado);
            let producto = resultadoObj.find( p => 
                p.id == i
            );
    
            if(producto){
                console.log(producto);
            } else {
                console.log(`Not found`);
            }
        } catch{ (err) => {

            throw new Error(err);
        }
        }
    }
}

const manejadorDeProductos = new ProductManager();

//console.log(manejadorDeProductos.addProduct("agua", "bebida", 100, "url", "code", 1000));
//console.log(manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code", 9000));
//manejadorDeProductos.getProducts();
manejadorDeProductos.getProductById(1);
