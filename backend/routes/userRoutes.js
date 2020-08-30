import express from 'express'
import User from '../models/userModel';
import { getToken } from '../utils';

const router = express.Router();

router.get('/', async (req,res)=>{
    const user = await User.find({});
    res.send(user)  
})


router.post('/signin', async(req, res)=>{
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    console.log(signinUser)
    if(signinUser){
        res.send({
            _id: signinUser.id,
            name: signinUser.name,
            email: signinUser.email,
            idAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        })
    } else{
        res.status(401).send({msg: 'Invalid Email or Password.'});    
    }
})

router.post('/register', async(req, res)=>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cep: req.body.cep,
        password: req.body.password
    })
    const newUser = await user.save();
    if(newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            telefone: newUser.telefone,
            endereco: newUser.endereco,
            cep: newUser.cep,
            password:newUser.req.body.password,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser)
        })
    } else{
        res.status(401).send({msg: 'Invalid User Data.'});    
    }
})

router.get("/createadmin",async(req, res)=>{
    try {
        const user = new User({
            name:'Mike',
            email:'mike@gmail.com',
            telefone: '988888888',
            endereco: 'Rua X',
            cep: '1235667',
            password:'1234',
            isAdmin:true
        })
        const newUser = await user.save();
        res.send(user);     
    } catch (error) {
        res.send({msg: error.message});
    }
    
   
})

export default router
