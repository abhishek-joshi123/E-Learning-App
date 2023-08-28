
import {HashPassword, ComparePassword} from '../Helper/Auth.js'
import { validationResult } from 'express-validator';
import JWT from 'jsonwebtoken';
import UserModel from '../Schemas/UserModel.js';


//  for registering user....
export const registercontroller = async(req, res) => {

        // if there are errors, return bad requests and the errors..
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success:false, Esuccess:true, errors: errors.array()});
        }

        
        try {
            const {name, email, password, role} = req.body;
            // checking existing user...
            const existingUser = await UserModel.findOne({email})
            if(existingUser) {
                return res.status(400).send({
                    success: false,
                    Esuccess:false,
                    message: 'User already exists'
                })
            }
            
            // hash the password..
            const HashedPassword = await HashPassword(password)
            
            //  save the user...
            const user = await new UserModel({name, email, role, password:HashedPassword}).save()

            res.status(201).send({
                success: true,
                message: 'User registered successfully',
                user
            })

        } catch (error) {
            res.status(404).send({
                success: false,
                message: 'Error in Registration',
                error
            })
        }
}

//  for login user....

export const logincontroller = async (req,res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({success: false, Esuccess: true, errors: errors.array()})
    }

    try {
        
        const {email, password} = req.body;

        const ExistingUser = await UserModel.findOne({email})
        if(!ExistingUser) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please login with correct email or phone"
            })
        }

        const passwordCompare = await ComparePassword(password, ExistingUser.password)

        if(!passwordCompare) {
            return res.status(400).send({
                success: false,
                Esuccess: false,
                message: "Please enter the password correctly"
            })
        }

        const auth_token = JWT.sign({_id:ExistingUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})
        res.status(201).send({
            success: true,
            message: 'You are Loged in successfully',
            user: {
                name: ExistingUser.name,
                email: ExistingUser.email,
                role: ExistingUser.role
            },
            auth_token
        })


    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Error in login",
            error 
        })
    }

}


export const TestController = async (req, res) => {

        try {
            res.send(req.user)

        } catch (error) {
            success: false,
            res.status(400).send("Internal server Error")
            error 
        }
}


