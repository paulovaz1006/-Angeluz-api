const connection = require('../../infra/connection');
class Login {
    logar(user, res) {
        const sql = `SELECT * FROM users WHERE email="${user.email}" && password="${user.password}"`;
        console.log(user)
        connection.query(sql, (error, resultado) => {
            if (error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(resultado);
            }
        });
    }
}

module.exports = new Login;