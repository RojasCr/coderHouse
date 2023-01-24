(async () => {
const fs = require("fs");

class CartsManager {
    carts = [];

    constructor(){
        //this.id = 0,
        this.products = ["asdas", "jasikj"],
        this.path = "./Clase5/proyectoFinal_primeraEntrega/src/carts/carts.json",
        this.productsPath = "./Clase5/proyectoFinal_primeraEntrega/src/products/products.json",
        this.type = "utf-8"
    }

    async addCart(){

        
        try{
            
            if(!fs.existsSync(this.path)){
                const cartsStr = JSON.stringify(this.carts, null, " ");
                await fs.promises.writeFile(this.path, cartsStr);
            }
            //if(fs.existsSync(this.path)){
                //this.id +=1;
                
                const cartsStr = await fs.promises.readFile(this.path, this.type);
                const cartsObj = JSON.parse(cartsStr);
                
                const newCart = {
                    id : 0,
                    products: this.products
                }

                if(cartsObj.length === 0){
                    newCart.id = 1;
                } else {
                    newCart.id = cartsObj[cartsObj.length - 1].id + 1;
                }
                
                cartsObj.push(newCart);

                const newCartsStr = JSON.stringify(cartsObj, null, " ");
                await fs.promises.writeFile(this.path, newCartsStr);
            //}
        } catch (err){
            throw new Error(err);
        }
    }

    async getCartById(cid){
        try{
            const cartsStr = await fs.promises.readFile(this.path,this.type);
            const cartsObj = JSON.parse(cartsStr);
    
            const cartId = cartsObj.find( c => c.id === cid);

            if(!cartId){
                console.log("Not found");
                return;
            }

            const productsCart = cartId.products;
            console.log(productsCart);

        } catch (err){
            throw new Error(err);
        }


    }

    async addProductToCart(cid, pid){
        try{
            const cartsStr = await fs.promises.readFile(this.path, this.type);
            const cartsObj = JSON.parse(cartsStr);
            const productsStr = await fs.promises.readFile(this.productsPath, this.type);
            const productsObj = JSON.parse(productsStr);

            const cartId = cartsObj.find( c => c.id === cid);
            const productId = productsObj.find( p => p.id === pid);

            if(!cartId || !productId){
                console.log("Cart or product not found");
                return;
            }

            const productToAdd = {
                product: productId.id,
                quantity: 0
            }

            
            const productRepeated = cartId.products.find( p => p.product === productId.id)
            if(productRepeated){
                //console.log("se repite");
                productRepeated.quantity += 1;
            } else {
                cartId.products.push(productToAdd);
            }
            

            const newCartsStr = JSON.stringify(cartsObj, null, " ");
            await fs.promises.writeFile(this.path, newCartsStr);


        } catch (err){
            throw new Error(err);
        }
    }
}

const manejadorDeCarrito = new CartsManager();

//await manejadorDeCarrito.addCart();
//await manejadorDeCarrito.addCart();
//await manejadorDeCarrito.addCart();
//await manejadorDeCarrito.addCart();
//await manejadorDeCarrito.addCart();
//await manejadorDeCarrito.addCart();
await manejadorDeCarrito.addProductToCart(4, 5);
//await manejadorDeCarrito.getCartById(3);
})();
