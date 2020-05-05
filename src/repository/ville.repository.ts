import { Ville } from './../models/ville';
import { MysqlConnection } from './../loaders/mysql';

/**
 * Cette classe est un repository
 * C'est ici qu'on met tout les accès à la bdd
 * Attention, aucune logique javascript ne doit apparaitre ici.
 * Il s'agit seulement de la couche de récupération des données (requeêe sql)
 */
export class VilleRepository {

    private static instance: VilleRepository;
    private connection: MysqlConnection = MysqlConnection.getInstance();

    private table: string = 'ville';

    static getInstance() {
        if (!this.instance) {
            this.instance = new VilleRepository();
        }
        return this.instance;
    }

    private constructor() {
    }

    /**
     * Make a query to the database to retrieve all ville and return it in a promise.
     */
    findAll(): Promise<Ville[]> {
        return this.connection.query(`SELECT * from ${this.table}`)
          .then((results: any) => {
            return results.map((ville: any) => new Ville(ville));
          });
    }

    /**
     * Make a query to the database to retrieve one ville by its id in parameter. 
     * Return the ville found in a promise.
     * @param id ville id
     */
    findById(id: number): Promise<Ville> {
        return this.connection.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
          .then((results: any) => new Ville(results[0]));
    }


    /**
     * Make a query to the database to insert a new ville and return the created ville in a promise.
     * @param ville ville to create
     */
    insert(ville: Ville) {
      return this.connection.query(
        `INSERT INTO ${this.table} (name, distance ) VALUES (?,?)`,
        [ville.name, ville.distance]
      ).then((result: any) => {
        // After an insert the insert id is directly passed in the promise
        return this.findById(result.insertId);
      });
    }

    /**
     * Make a query to the database to update an existing ville and return the updated ville in a promise.
     * @param ville ville to update
     */
    update(ville: Ville) {
      return this.connection.query(
        `UPDATE ${this.table} SET name = ?, distance = ? WHERE id = ?`,
        [ville.name, ville.distance, ville.id]
      ).then(() => {
        return this.findById(ville.id);
      });
    }

    /**
     * Make a query to the database to delete an existing ville and return an empry promise
     * @param id ville id to delete
     */
    delete(id: number): Promise<any> {
      return this.connection.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }
}
