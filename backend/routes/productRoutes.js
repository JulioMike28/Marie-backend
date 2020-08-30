import express from 'express'
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../utils';


const router = express.Router();

router.get("/",  async (req, res)=>{
    const products = await Product.find({});
    res.send(products)
});

router.get("/:id",  async (req, res)=>{
    const product = await Product.findOne({_id:req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"Not found peça."})
    }
    
});

router.post("/", async(req, res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        cor: req.body.cor,
        description: req.body.description,
        novidade: req.body.novidade,
        promo: req.body.promocao,
        desconto: req.body.desconto
    });
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({message:"New Product Created", data: newProduct});
    }

    return res.status(500).send({message: 'error in creating product.'});
})
router.put("/:id",async(req, res)=>{
    const productId = req.params.id;
    const product = await Product.findById({_id: productId});
    if(product){
        product.name = req.body.name;
        product.image = req.body.image;
        product.price = req.body.price;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.cor = req.body.cor;
        product.description = req.body.description;
        product.novidade = req.body.novidade;
        product.promo = req.body.promocao;
        product.desconto = req.body.desconto;
        const updatedProduct = await product.save();
        if(updatedProduct){
            return res.status(201).send({message:"Product Updated", data: updatedProduct});
        }
    
    }
    return res.status(500).send({message: 'error in creating product.'});
})

router.delete("/:id", async (req,res)=>{
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message:"Product Deleted."});
    }else{
        res.send("Erro.")
    }
})

export default router
