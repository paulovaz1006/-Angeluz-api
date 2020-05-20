class TableRegisterUser {

    init(connection) {
        this.connection = connection;
        this.registerUser();
    }

    registerUser() {
        const sql = `CREATE TABLE IF NOT EXISTS users (
                id_user int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                full_name varchar(50), 
                nationality varchar(20), 
                civil_status varchar(10) NOT NULL, 
                occupation varchar(30), 
                rg varchar(9) NOT NULL, 
                cpf varchar(11) NOT NULL, 
                address varchar(100) NOT NULL, 
                number varchar(10) NOT NULL,
                district varchar(50) NOT NULL,
                zip_code varchar(8) NOT NULL,
                city varchar(20) NOT NULL,
                state varchar(20) NOT NULL,
                type_user int NOT NULL,
                password varchar(20) NOT NULL,
                email varchar(50) NOT NULL
            )`;

        this.connection.query(sql, error => {
            if (error) {
                console.log(error)
            }
        });
    }    
}

module.exports = new TableRegisterUser;