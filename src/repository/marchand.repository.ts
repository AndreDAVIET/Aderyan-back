import { Marchand } from './../models/marchand';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class MarchandRepository {

    private static instance: MarchandRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'marchand';

    static getInstance() {
        if (!this.instance) {
            this.instance = new MarchandRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all marchands and return it in a promise.
     */
    findAll(): Promise<Marchand[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((marchand: any) => new Marchand(marchand));
          });
    }

    /**
     * Make a query to the database to retrieve one marchand by its id in parameter. 
     * Return the marchand found in a promise.
     * @param id marchand id
     */
    findById(id: number): Promise<Marchand> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Marchand(results[0]));
    }


    /**
     * Make a query to the database to insert a new marchand and return the created marchand in a promise.
     * @param marchand marchand to create
     */
    insert(marchand: Marchand) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name, ville ) VALUES (?,?)`,
        [marchand.name, marchand.ville]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing marchand and return the updated marchand in a promise.
     * @param marchand marchand to update
     */
    update(marchand: Marchand) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, ville = ? WHERE id = ?`,
        [marchand.name, marchand.ville, marchand.id]
      ).then(() => {
        return this.findById(marchand.id);
      });
    }

    /**
     * Make a query to the database to delete an existing marchand and return an empry promise
     * @param id marchand id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
