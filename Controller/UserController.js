const User = require('../Models/UserModel')
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')


const userRegistration = async(req,res)=>{
    try {
        console.log("hello anas......");
        const{name,email,mobile,password} = req.body
        console.log(name,"name");
        const exist = await User.findOne({email:email})
        if(exist){
            return res.status(200).json({alert:'Email already exist', status:false})
        }else{
            const hashPassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                name:name,
                email:email,
                mobile:mobile,
                password:hashPassword
            })
            const token = jwt.sign({ userId : newUser._id } , "itsNewToken" ,{ expiresIn : "1m" })
            return res.status(200).json({token:token,user:newUser, alert:"Registered",status:true})
        }
       
        
    } catch (error) {
       console.log(error.message);
       res.status(500).json({error:'Internal Server Error'}) 
    }

}

const UserLogin = async(req,res) => {
    try {

        const {email,password} = req.body
        const exists = await User.findOne({email:email})
        if(exists){
            const access = await bcrypt.compare(password,exists.password)
            
            if(access){
                const token =   jwt.sign({ userId: access._id },"itsNewToken" ,{ expiresIn : "1m" })
                return res.status(200).json({user:exists,token:token,message:"Login", status:true})  
            }else{
                console.log("no access....");
                return res.status(209).json({alert:"Password is wrong", status:false})
            }
        }else{
            return res.status(201).json({alert:"No Account in this Email", status:false})
        }
    } catch (error) {
         console.log(error.message);
    }
}

const updateImage = async(req,res)=>{
    try {
        console.log("Image updation");
        const id = req.body.userId
      
        const img = req.file.filename
        
        const update = await User.findOneAndUpdate({_id:id},{$set:{Image:img}},{new:true}).then((response)=>{
            return res.json({updated:true,data:response})
        })
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    userRegistration,
    UserLogin,
    updateImage,
}