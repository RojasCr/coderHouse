
const fs = require("fs");

class ProductManager {
    products = [];
    
    constructor(){
        //this.id = 0;
        this.path = "./files/products.json";
        this.type = "utf-8";
    }

    
    
    //Método para agregar productos
    async addProduct(title, description, price, thumbail, code, stock){
        //this.id = this.id + 1;
        
        let producto = {
            id: 0,
            title,
            description,
            price,
            thumbail,
            code,
            stock
        }

        try{

            
            //Validaciones
            
            
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
            if(resultadoObj.length == 0){
                producto.id = 1
            } else {
                producto.id = resultadoObj[resultadoObj.length - 1].id + 1;
            }

            resultadoObj.push(producto);
            
            
            
            //Guardarlo en archivo json
            let resultadoStr2 = JSON.stringify(resultadoObj, null, " ");
            await fs.promises.writeFile(this.path, resultadoStr2);
            
            
            console.log(`Producto agregado con id: ${producto.id}`);
            
        } catch (err){
            //console.log(err)
            throw new Error(err);
        }
        
    }
    
    //Método para obtener el arreglo products
    async getProducts(){
        try{
            if(!fs.existsSync(this.path)){
                
                let productsStr = JSON.stringify(this.products, null, " ");
                await fs.promises.writeFile(this.path, productsStr);
            } 
            if(fs.existsSync(this.path)){
                const resultado = await fs.promises.readFile("./files/products.json", "utf-8");
                const resultadoStr =  resultado;
                const resultadoObj = await JSON.parse(resultadoStr);
                console.log(resultadoObj);
            }
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
                    return producto;
                } else {
                    console.log(`Not found`);
                    return `Not found`;
                }
        } catch (err){
                throw new Error(err);
        }
    }
        
    async updateProduct(i, title, description, price, thumbail, code, stock){
        try{
            let resultado = await fs.promises.readFile(this.path, this.type);
            let resultadoObj = await JSON.parse(resultado);
            
            let producto = resultadoObj.find( p => 
                p.id == i
            );
                    
            let productoActualizado = {
                id: i,
                title,
                description,
                price,
                thumbail,
                code,
                stock
            };
                    
            if(producto){
                console.log(producto);
                let productoIndice = resultadoObj.indexOf(producto);
                //console.log(productoIndice);
                resultadoObj[productoIndice] = productoActualizado;
                console.log(resultadoObj);
                
                //Guardarlo en archivo json
                let actualizadoStr = JSON.stringify(resultadoObj, null, " ");
                await fs.promises.writeFile(this.path, actualizadoStr);
                return;
            } else {
                console.log(`Not found`);
                return `Not found`;
            }
        } catch (err){
            throw new Error(err);
        }
    }
    
    async deleteProduct(i){
        try{
            let resultado = await fs.promises.readFile(this.path, this.type);
            let resultadoObj = await JSON.parse(resultado);
            
            let producto = resultadoObj.find( p => 
                p.id == i
            );
        
            if(producto){
                //console.log(producto);
                let productoIndice = resultadoObj.indexOf(producto);
                //console.log(productoIndice);
                resultadoObj.splice(productoIndice, 1);
                console.log(resultadoObj);
                
                //Guardarlo en archivo json
                let actualizadoStr = JSON.stringify(resultadoObj, null, " ");
                await fs.promises.writeFile(this.path, actualizadoStr);
                //return;
                
            } else {
                console.log(`Not found`);
                return `Not found`;
            }
        } catch (err){
            throw new Error(err);
        }
    }
}

const manejadorDeProductos = new ProductManager();

  
//manejadorDeProductos.getProducts();
//manejadorDeProductos.addProduct("agua", "bebida", 100, "url", "code2712", 1000);
//manejadorDeProductos.getProducts();
//manejadorDeProductos.getProductById(1);
//manejadorDeProductos.updateProduct(1, "manaos", "bebida", 5500, "url1", "code1578", 9000);
//manejadorDeProductos.deleteProduct(1);