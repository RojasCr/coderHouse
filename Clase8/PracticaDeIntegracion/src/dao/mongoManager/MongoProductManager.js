const productsModel = require("../models/products.model");

class MongoProductManager{
    getProducts = async(req, res) => {
        try{
            const { limit } = req.query;
            if(!limit){
                const products = await productsModel.find();
                return res.json(products);
            }
            let productsLimit = await productsModel.find().limit(limit);
            res.json(productsLimit);
        } catch(err){
            throw new Error(err);
        }
    }

    getProductbyId = async(req, res) => {
        try {
            const { pid } = req.params;
            const product = await productsModel.find({id: pid});
            const productsLength = await productsModel.count();
            if(pid > productsLength){
                return res.status(404).send(`Product not found`);
            }
            res.json(product);
        } catch (error) {
            throw new Error(error);
        }
    }

    addProduct = async (req, res) => {
        try{
            const { title, description, price, thumbail, code, stock, category} = req.body;
            const product = {
                id: 1,
                title,
                description,
                price, 
                thumbail,
                code,
                stock,
                category
            }
            const products = await productsModel.find();

            if(products.length !== 0){
                product.id = products[products.length - 1].id + 1;
            }
            
            const added = await productsModel.create(product);
            res.send(`Producto agregado con id: ${added.id}`);
            
        } catch(err){
            throw new Error(err);
        }
    }

    updateProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            const { title, description, price, thumbail, code, stock, category} = req.body;
            const product = {
                id: pid,
                title,
                description,
                price, 
                thumbail,
                code,
                stock,
                category
            };
            const response = await productsModel.updateOne({id: pid}, product);
            return res.json(response);
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            await productsModel.deleteOne({id: pid});
            return res.send(`Product ${pid} deleted`);
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = MongoProductManager;