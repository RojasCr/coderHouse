const customRouter = require("../../routers/CustomRouter");

const manejadorDeProductos = require("../../dao/filesManager/productManager");
const productsModel = require("../../dao/mongo/models/products.model");
const MongoProductManager = require("../../dao/mongoManager/MongoProductManager");
const createMock = require("../../utils/mocks/productsMock");
const productError = require("../../utils/errors/product/product.error");
//const errorHandler = require("../../middlewares/errors");
const productManager = new MongoProductManager();


class ProductsRouter extends customRouter{
    init(){


        this.get("/", ["PUBLIC"], async (req, res) =>{
            try {
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
            } catch (error) {
                req.logger.fatal("Poductos no encontrados")
            }
        });
        
        this.get("/mockingproducts", ["PUBLIC"], (req, res) => {
            const products = createMock(100);
            res.sendSuccess(products);
        })

        this.get("/:pid", ["PUBLIC"], async (req, res) => {
            try {
                const { pid } = req.params;
    
                //productError(Number(pid));
    
                const response = await productManager.getProductbyId(pid);
                
                res.sendSuccess(response);
                
            } catch (error) {
                req.logger.error(error.cause)
                res.sendServerError(error)
            }
        });



        this.post("/", ["ADMIN"], async (req, res) => {
            try{
                
                const { title, description, price, thumbail, code, stock, category} = req.body;
                
                if(!title || !description || !price || !thumbail || !code || !stock || !category){
                    return productError(null, { title, description, price, thumbail, code, stock, category})
                }
                
                const product = {
                    title,
                    description,
                    price, 
                    thumbail,
                    code,
                    stock,
                    category
                }

                const result = await productManager.addProduct(product);
               
                res.sendSuccess(`Producto agregado con id: ${result.id}`);
                    
            } catch(error){
                req.logger.error(error.cause)
                //console.log(err.cause);
                res.sendUserError(error.name) 
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
                const { pid } = req.params;
                const { title, description, price, thumbail, code, stock, category} = req.body;
                
                if(!title || !description || !price || !thumbail || !code || !stock || !category){
                    return productError(null, { title, description, price, thumbail, code, stock, category})
                }
                
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


                const result = await productManager.updateProduct(pid, product);
                res.sendSuccess(result);
            } catch (error) {
                req.logger.error(error.cause)
                //console.log(error.cause);
                res.sendUserError(error.name)
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