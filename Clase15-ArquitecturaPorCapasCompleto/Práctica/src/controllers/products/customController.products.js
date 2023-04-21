const customRouter = require("../../routers/CustomRouter");

const manejadorDeProductos = require("../../dao/filesManager/productManager");
const productsModel = require("../../dao/mongo/models/products.model");
const MongoProductManager = require("../../dao/mongoManager/MongoProductManager");
const productManager = new MongoProductManager();


class ProductsRouter extends customRouter{
    init(){

        this.get("/", ["PUBLIC"], async (req, res) =>{
            let { limit, page, sort, query } = req.query;
        
            let response = await productManager.getProducts(limit, page, sort, query);
        
            const products = {
                status: response ? "succes" : "error",
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: response.hasPrevPage? `localhost:8080/api/products?page=${Number(page)-1}` : null,
                nextLink: response.hasNextPage? `localhost:8080/api/products?page=${Number(page)+1}` : null
            }

            return res.sendSuccess(products);
        });

        this.get("/:pid", ["PUBLIC"], async (req, res) => {
            const { pid } = req.params;
            const response = await productManager.getProductbyId(pid);
            
            res.sendSuccess(response);
        });

        this.post("/", ["ADMIN"], async (req, res) => {
            try{
                const result = await productManager.addProduct(req, res);
                res.sendSuccess(result.id)
                //     const { title, description, price, thumbail, code, stock, category} = req.body;
                //     const product = {
                //         title,
                //         description,
                //         price, 
                //         thumbail,
                //         code,
                //         stock,
                //         category
                //     }
                //     //const added = await manejadorDeProductos.addProduct(...product);
                //     const added = await productsModel.create(product);
                //     //const products = await manejadorDeProductos.getProducts();
                //     res.send(`Producto agregado`);
                    
            } catch(err){
                throw new Error(err);
            }
        });

        this.post("/loadProducts", ["ADMIN"],async (req, res) => {
            try{
                await productsModel.deleteMany();
                const products = await manejadorDeProductos.getProducts();
                await productsModel.insertMany(products);
                res.sendSuccess("Productos agregados a DB");
            } catch (err) {
                throw new Error(err);
            }
        });

        this.put("/:pid", ["ADMIN"],async (req, res) => {
            try {
                const result = await productManager.updateProduct(req, res);
                res.sendSuccess(result);
            } catch (error) {
                throw error;
            }
            // const { pid } = req.params;
            // const { title, description, price, thumbail, code, stock, category} = req.body;
            // const product = [
            //     id= pid,
            //     title,
            //     description,
            //     price, 
            //     thumbail,
            //     code,
            //     stock,
            //     category
            // ];
            // await manejadorDeProductos.updateProduct(...product);
        });

        this.delete("/:pid", ["ADMIN"], async(req, res) => {
            try {
                const response = await productManager.deleteProduct(req, res);
                res.sendSuccess(response);
            } catch (error) {
                throw error
            }
            // const { pid } = req.params;
            // await manejadorDeProductos.deleteProduct(pid);
        });

    }
}

module.exports = ProductsRouter;