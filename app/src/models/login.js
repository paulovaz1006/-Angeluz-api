const connection = require('../../infra/connection');
class Login {
    logar(user, res) {
        const sql = `SELECT * FROM users WHERE email="${user.email}" && password="${user.password}"`;
        
        connection.query(sql, (error, resultado) => {
            if (error) {
                res.status(400).json({error,message: 'email ou senha incorreto'});
            } else {
                if (resultado.length === 1) {
                    res.status(200).json(resultado);
                } else {
                    res.status(400).json({message: 'email ou senha incorreto'});
                }                
            }
        });
    }
}

module.exports = new Login;