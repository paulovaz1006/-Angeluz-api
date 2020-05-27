const connection = require('../../infra/connection');
const bcrypt = require('bcrypt');

class RegisterUsers {
    

    getUser(id, res) {
        const sql = 'SELECT * FROM users WHERE id_user = ?';

        connection.query(sql, id, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    async addPassword(password) {
        const newPassword = await RegisterUsers.generatePassword(password);
    }

    registerUser(user, res) {
        const sql = 'INSERT INTO users SET ?';

        RegisterUsers.addPassword(user.password)
        
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

    static generatePassword(password) {
        const costHash = 12;
        return bcrypt.hash(password, costHash)
    }
}

module.exports = new RegisterUsers;