const RegisterUserModel = require('../models/users.js')

module.exports = app => {
    app.get('/usuario/:id', (req, res) => {
        const id = req.params.id;
        RegisterUserModel.getUser(id, res);
    });

    app.post('/cadastro-usuario', (req, res) => {
        const user = req.body;
        RegisterUserModel.registerUser(user, res);
    });

    app.patch('/alterar-usuario/:id', (req, res) => {
        const id = req.params.id;
        const user = req.body;
        RegisterUserModel.alterUser(id, user, res);
    });
}