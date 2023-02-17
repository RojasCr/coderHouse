
const cartsModel = require("../models/carts.model")

class MongoCartManager{
    addCart = async (req, res) => {
        try {
            //const cartsLength = await cartsModel.count();
            const carts = await cartsModel.find();
            const cartsLength = carts.length;
    
            const newCart = {
                id: 0,
                products: []
            };
    
            if(cartsLength !== 0){
                newCart.id = carts[cartsLength - 1].id + 1;
            }
    
            await cartsModel.create(newCart);
        } catch (err) {
            throw new Error(err);
        }
    }


    addProductToCart = async(req,res) => {
        try{
            const { cid, pid} = req.params;
            const producto = await productsModel.findOne({id: Number(pid)});
            const productToAdd = {
                product : producto.id,
                quantity: 1
            }
        
            const cart = await cartsModel.findOne({id: Number(cid)});
            const productRepeated = cart.products.find(p => p.product === Number(pid));
            if(productRepeated){
                const newQuantity = productRepeated.quantity + 1;
                await cartsModel.updateOne({id: Number(cid), "products.product": Number(pid)}, {$set: {"products.$.quantity": newQuantity}});
                res.send(`Cantidad aumentada`);
            } else {
                await cartsModel.updateOne({id: Number(cid)},{$addToSet: {products: productToAdd}});
                res.send(`Producto agregado`);
            }
        } catch (err){
            throw new Error(err);
        }
    };

    getCartById = async (req, res) => {
        try{
            const { cid } = req.params;
            const cartId = await cartsModel.findOne({id: Number(cid)});

            if(!cartId){
                return res.send(`Cart not found`);
            }

            return res.json(cartId.products);
        } catch (err){
            throw new Error(err);
        }

    }

}


module.exports = MongoCartManager;