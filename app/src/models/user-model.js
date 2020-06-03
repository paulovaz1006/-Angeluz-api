const bcrypt = require('bcrypt')
const connection = require('../../infra/connection');

class UserModel {
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

    async registerUser(user, res) {
        const sql = 'INSERT INTO users SET ?';        
        console.log(user.password)    

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

    async searchEmail(email) {  
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM users WHERE email= ?`;
        
            connection.query(sql, email, (error, user) => {            
                if (error) {
                    return reject('Não foi possível encontrar o usuário!');
                } else {                
                    return resolve(user);            
                }
            });
        })
    }

    async searchId(id) {                
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE id_user = ?';

            connection.query(sql, id, (error, user) => {
                if (error) {
                    return reject('Usuario não encontrado')
                } else {
                    return resolve(user)
                }
            })
        });        
    }
}

module.exports = new UserModel;