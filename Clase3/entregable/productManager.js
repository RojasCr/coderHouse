const fs = require("fs");

class ProductManager {
    products = [];
    
    constructor(){
        this.id = 0;
        this.path = "./files/products.json";
        this.type = "utf-8";
    }

    
    
    //Método para agregar productos
    async addProduct(title, description, price, thumbail, code, stock){
        this.id = this.id + 1;
        
        const producto = {
            id: this.id,
            title,
            description,
            price,
            thumbail,
            code,
            stock
        }
        try{

            
            //Validaciones
            if(!fs.existsSync(this.path)){
                
                let productsStr = JSON.stringify(this.products, null, " ");
                await fs.promises.writeFile(this.path, productsStr);
            } 
            if(fs.existsSync(this.path)){

                let resultado = await fs.promises.readFile(this.path, this.type);
                //let resultadoStr1 = resultado;
                let resultadoObj = JSON.parse(resultado);
        
                let repetido = resultadoObj.find( c => c.code == code);
                if(repetido){
                    console.log(`El code ya existe`);
                    return;
                }
                if(!title || !description || !price || !thumbail || !code || !stock){
                    console.log(`Faltan datos`);
                    return;
                }
        
                //Agregar producto a products
                resultadoObj.push(producto);
                
                
                //Guardarlo en archivo json
                let resultadoStr2 = JSON.stringify(resultadoObj, null, " ");
                await fs.promises.writeFile(this.path, resultadoStr2);
        
        
                console.log(`Producto agregado con id: ${this.id}`);
                
            }
        } catch (err){
            //console.log(err)
            throw new Error(err);
        }

        
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

manejadorDeProductos.addProduct("agua", "bebida", 100, "url", "code2712", 1000);
manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code6879", 9000);
manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code68797", 9000);
//manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code145", 9000);
//manejadorDeProductos.addProduct("coca", "bebida", 500, "url1", "code14578", 9000);
//manejadorDeProductos.getProducts();
//manejadorDeProductos.getProductById(1);
