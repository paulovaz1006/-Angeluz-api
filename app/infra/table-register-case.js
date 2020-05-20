class TableRegisterCase {

    init(connection) {
        this.connection = connection;
        this.registerCase();
    }

    registerCase() {
        const sql = `CREATE TABLE IF NOT EXISTS cases (
                id_case int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
                name varchar(50) NOT NULL, 
                description varchar(1000) NOT NULL, 
                category varchar(50) NOT NULL, 
                date_create DATETIME NOT NULL, 
                date_valid DATETIME NOT NULL, 
                id_user int NOT NULL,            
                date_finish DATETIME,
                id_angeluz int,
                status varchar(30) NOT NULL,
                FOREIGN KEY (id_user) REFERENCES users(id_user),
                FOREIGN KEY (id_angeluz) REFERENCES users(id_user)
            );`;

        this.connection.query(sql, error => {
            if (error) {
                console.log(error)
            }
        });
    }    
}

module.exports = new TableRegisterCase;