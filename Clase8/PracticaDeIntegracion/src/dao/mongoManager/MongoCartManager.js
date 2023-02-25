const productsModel = require("../models/products.model")
const cartsModel = require("../models/carts.model")

class MongoCartManager{
    addCart = async () => {
        try {
            //const cartsLength = await cartsModel.count();
            const carts = await cartsModel.find();
            const cartsLength = carts.length;
    
            const newCart = {
                id: 1,
                products: []
            };
    
            if(cartsLength !== 0){
                newCart.id = carts[cartsLength - 1].id + 1;
            }
    
            await cartsModel.create(newCart);
            return `Cart created with id ${newCart.id}`
        } catch (err) {
            throw new Error(err);
        }
    }

    getCartById = async (cid) => {
        try{
            const cartId = await cartsModel.findOne({id: cid}).populate("products.product");

            if(!cartId){
                return `Cart not found`;
            }

            return cartId;
        } catch (err){
            throw new Error(err);
        }

    }

    addProductToCart = async(cid, pid) => {
        try{
            
            const producto = await productsModel.findOne({id: pid});
            const productToAdd = {
                product : producto._id,
                quantity: 1
            }
            
            const cart = await cartsModel.findOne({id: cid});
            const productRepeated = cart.products.find(p => String(p.product) === String(producto._id));
            if(productRepeated){
                const newQuantity = productRepeated.quantity + 1;
                const result = await cartsModel.updateOne({id: Number(cid), "products.product": String(producto._id)}, {$set: {"products.$.quantity": newQuantity}});
                return result;
            } else {
                cart.products.push(productToAdd);
                let result = await cartsModel.updateOne({id: Number(cid)}, cart);
                return result;
            }
            
        } catch (err){
            throw new Error(err);
        }
    };
    
    
    
    //****Preguntar****
    updateCart = async (cid, pid) => {
        try {
            const cart = await cartsModel.findOne({id: Number(cid)});
            const producto = await productsModel.findOne({id: Number(pid)});
            const update = [
                {
                    product: producto._id,
                    quantity:1
                }
            ];
            if(cart){
                await cartsModel.updateOne({id: Number(cid)}, {$set: {products: update}})
                return `Products updated`;
            }else {
                return `Cart not found`;
            }
        } catch (error) {
            throw new Error(error);
        }
    }
    
    updateQuantity = async (cid, pid, quan) => {
        try {
            const cart = await cartsModel.findOne({id: cid});
            const producto = await productsModel.findOne({id: Number(pid)});
            const product = cart.products.find(p => String(p.product) === String(producto._id));
            if(product){
                await cartsModel.updateOne({id: Number(cid), "products.product": String(producto._id)}, {$set: {"products.$.quantity": Number(quan)}});
                return `Cantidad aumentada`;
            }else{
                return `Product not found`;
            }
        } catch (error) {
            throw new Error(error);
        }
        
    }
    
    deleteCart = async (cid) => {
        try {
            const cart = await cartsModel.findOne({id: Number(cid)});
            await cartsModel.updateOne({id: Number(cid)}, {$set: {products: []}});
            return `Products deleted from cart ${cart.id}`;
        } catch (error) {
            throw new Error(error);
        }

    }
    
    deleteProductFromCart = async (cid, pid) => {
        try {
            const cartCid = await cartsModel.findOne({id: Number(cid)});
            const producto = await productsModel.findOne({id: Number(pid)})
            const productToDelete = cartCid.products.find(p => String(p.product) === String(producto._id));
            if(!productToDelete){
                return `Product not found`;
            }
            await cartsModel.updateOne({id: Number(cid)}, {$pull: {products: productToDelete}})
            return `Product deleted`;
            
        } catch (error) {
            throw Error(error);
        }
    }
}


module.exports = MongoCartManager;