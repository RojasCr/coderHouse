const productsModel = require("../mongo/models/products.model");

class MongoProductManager{
    getProducts = async (limit, page, sort, query) => {
        try{
            //const { limit } = req.query;
            const asc = 1;
            const desc = -1;
            const none = 0;

            let filtrado = {};
            if(query && query == "available"){
                filtrado = {stock: {$gt: 0}}
                
            }
            if(query && query !== "available"){

                filtrado = {category: query}
            }
            

            const productsLimit = await productsModel.paginate(filtrado, {limit: limit || 10, page: page || 1, sort: {price: sort } || none});
            return productsLimit;
        } catch(err){
            throw new Error(err);
        }
    }

    getProductbyId = async(pid) => {
        try {
            
            const product = await productsModel.findOne({id: pid});
            //const productsLength = await productsModel.count();
            if(!product){
                return `Product not found`;
            }
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }

    getByMongoId = async(id) => {
        try {
            const product = await productsModel.findById(id);
            if(!product){
                return `Product not found`;
            }
            return product;
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
            return added;
            //res.send(`Producto agregado con id: ${added.id}`);
            
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
            return response;
            //return res.json(response);
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const { pid } = req.params;
            await productsModel.deleteOne({id: pid});
            return `Product ${pid} deleted`;
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = MongoProductManager;