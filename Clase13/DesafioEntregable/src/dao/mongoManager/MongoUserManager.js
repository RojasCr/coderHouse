
const { cryptPassword } = require("../../utils/cryptPassword");
const userModel = require("../models/users.model");

class UserManager{
    createUser = async (newUser) => {
        try {
            const user = await userModel.create(newUser);
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }

    findAll = async() => {
        try {
            const response = await userModel.find();
            return response;
        } catch (error) {
            throw error
        }
    }
    
    findUser = async(user) => {
        try {
            const response = await userModel.findOne({email: user}).populate("cart")
            return response;
        } catch (error) {
            console.log(error)
        }
    }

    findById = async(id) => {
        try {
            const result = await userModel.findById(id);
            return result;            
        } catch (error) {
            console.log(error)
        }
    }

    updateUser = async(email, newPassword) => {
        try {
            await userModel.updateOne({email}, {password: cryptPassword(newPassword)})
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = UserManager;