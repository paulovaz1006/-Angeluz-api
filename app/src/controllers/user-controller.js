const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user-model.js');

class UserController {    
    async registerUser(req, res){
        const user = req.body;
        const newPassword = await UserController.generatePassword(req.body.password); 

        req.body.password = newPassword;
        
        UserModel.registerUser(user, res);
    }

    static generatePassword(password) {
        const costHash = 12;
        return bcrypt.hash(password, costHash)
    }

    getUser(req, res) {
        const id = req.params.id;
        
        UserModel.getUser(id, res);
    }    

    alterUser(req, res) {
        const id = req.params.id;
        const user = req.body;

        UserModel.alterUser(id, user, res);
    }

    login(req, res) {
        const token = UserController.generateTokenJwt(req.user);
        res.set('Authorization', token);
        res.status(200).json({token: token});
    }    

    static generateTokenJwt(user) {
        const payload = {
            id: user.id
        }
    
        const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '30m'});
    
        return token;
    }

    async searchEmail(email) {   
        const user = await UserModel.searchEmail(email);
       
        if (!user) {
            return null
        }

        return user[0];
    }    

    async searchId(id) {
        const idUser = await UserModel.searchId(id);

        if (!idUser) {
            return null;
        }

        return new UserController(idUser);
    }
}

module.exports = new UserController;