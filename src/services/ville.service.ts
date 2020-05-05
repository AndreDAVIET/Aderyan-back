import { VilleRepository } from './../repository/ville.repository';
import { Ville } from 'src/models/ville';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les villes doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class VilleService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: VilleService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new VilleService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: VilleRepository;
    private constructor() {
        this.repository = VilleRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of ville.
     */
    getAll(): Promise<Ville[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the ville relative to the id in parameter.
     * @param id ville id
     */
    getById(id: number): Promise<Ville> {
        return this.repository.findById(id);
    }

    /**
     * Create a new ville and return a promise which contains the created ville.
     * @param ville ville to create
     */
    create(ville: any): Promise<Ville> {
      return this.repository.insert(ville);
    }

    /**
     * Update the ville in parameter and return a promise which contains the updated ville.
     * @param ville ville to update
     */
    update(ville: any): Promise<Ville> {
      return this.repository.update(ville);
    }

    /**
     * Delete the ville related to the id in parameter. Return an empty promise.
     * @param id ville id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
