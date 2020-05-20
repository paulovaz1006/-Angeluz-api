const LoginModel = require('../models/login');

module.exports = (app) => {
    app.post('/login', (req, res) => {
        const user = req.body;
        LoginModel.logar(user, res);
    });
}