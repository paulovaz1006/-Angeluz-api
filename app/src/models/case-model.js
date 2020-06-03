const connection = require('../../infra/connection');

class CaseModel {
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

    getCases(res) {
        const sql = `SELECT DISTINCT 
            cases.id_case, 
            cases.id_user,
            cases.status, 
            cases.description, 
            cases.name, 
            users.photo
            FROM cases 
            INNER JOIN users  
            WHERE cases.status = "Aguardando Angeluz"
            GROUP BY cases.id_case`;

        connection.query(sql, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    getCaseDetail(id, res) {
        const sql = `SELECT 
        cases.id_case, 
        cases.name,
        cases.description,
        cases.category,
        cases.date_create,
        cases.date_valid, 
        cases.status, 
        users.full_name,
        users.address,
        users.number,
        users.district,
        users.phone,
        users.zip_code,
        users.city,
        users.state,
        users.photo,
        users.cellphone
        FROM cases 
        INNER JOIN users  
        WHERE cases.id_case = ?
        LIMIT 1`;

        connection.query(sql, id, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    myCasesAngeluz(id, res) {
        const sql = 'SELECT * FROM cases INNER JOIN users WHERE id_angeluz = ? and users.id_user = cases.id_user';

        connection.query(sql, id, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }

    myCases(id, res) {
        const sql = 'SELECT * FROM cases WHERE id_user = ?';

        connection.query(sql, id, (error, response) => {
            if (error) {
                res.status(400).json(error)
            } else {
                res.status(200).json(response)
            }
        });
    }
}

module.exports = new CaseModel;