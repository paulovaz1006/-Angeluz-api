const connection = require('../../infra/connection');

class RegisterUsers {
    registerUser(user, res) {
        const sql = 'INSERT INTO users SET ?';

        connection.query(sql, user, (error) => {
            if (error) {
                if (error.sqlState == 23000) {
                    res.status(400).json({error, message: 'Este e-mail ja foi utilizado'});
                } else {
                    res.status(400).json({error, message: 'Erro ao cadastrar'});
                }                
            } else {
                res.status(200).json({message: 'Cadastro realizado com sucesso!'});
            }
        });
    }

    alterUser(id, user, res) {
        const sql = 'UPDATE users SET ? WHERE id_user=?';

        connection.query(sql, [ user, id ], (error) => {
            if (error) {
                res.status(400).json({error, message: 'Erro ao editar'});              
            } else {
                res.status(200).json({message: 'Usuário editado com sucesso!'});
            }
        });
    }
}

module.exports = new RegisterUsers;