const connection = require('../../infra/connection');

class RegisterCase {
    getCases(res) {
        const sql = 'SELECT * FROM cases WHERE status != "Em Andamento"';

        connection.query(sql, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    myCases(id, res) {
        const sql = 'SELECT * FROM cases WHERE id_angeluz = ?';

        connection.query(sql, id, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    addCase(data, res) {
        const sql = 'INSERT INTO cases SET ?';

        connection.query(sql, data, (error) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({ data, message: 'Cadastro realizado com sucesso'})
            }
        });
    }

    alterCase(id, data, res) {
        const sql = 'UPDATE cases SET ? WHERE id_case=?';

        connection.query(sql, [ data, id ] , (error) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({ data, message: 'Caso Editado com sucesso'})
            }
        });
    }

    deleteCase(id, res) {
        const sql = 'DELETE FROM cases WHERE id_case=?';

        connection.query(sql, id, (error) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json({message: 'Caso deletado'})
            }
        });
    }
}

module.exports = new RegisterCase;