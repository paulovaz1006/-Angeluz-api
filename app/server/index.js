const customExpress = require('../config/custom-express');
const connection = require('../infra/connection');
const TableRegisterUser = require('../infra/table-register-user');
const TableRegisterCase = require('../infra/table-register-case');

connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        TableRegisterUser.init(connection)
        TableRegisterCase.init(connection)
        const app = customExpress();
        app.listen(3300, () => console.log('Servidor rodando'));
    }
});