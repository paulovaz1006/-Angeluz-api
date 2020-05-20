const RegisterUser = require('../models/cases');

module.exports = app => {
    app.get('/casos', (req, res) => {
        RegisterUser.getCases(res)
    });

    app.get('/meus-casos/:id', (req, res) => {
        const id = req.params.id;
        RegisterUser.myCases(id, res)
    });

    app.post('/cadastro-de-casos', (req, res) => {
        const data = req.body;
        RegisterUser.addCase(data, res)
    });

    app.patch('/alterar-caso/:id', (req, res) => {
        const id = req.params.id;
        const data = req.body;
        RegisterUser.alterCase(id, data, res)
    });

    app.delete('/deletar-caso/:id', (req, res) => {
        const id = req.params.id;
        RegisterUser.deleteCase(id, res)
    });
}