import { MarchandRepository } from './../repository/marchand.repository';
import { Marchand } from 'src/models/marchand';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les marchand doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controller
 */
export class MarchandService {

    // Make service => singletonTransformation de notre service en singleton
    private static instance: MarchandService;
    static getInstance() {
        if (!this.instance) {
            this.instance = new MarchandService();
        }
        return this.instance;
    }

    // Un singleton est une class ayant une instance unique a travers toute l'app
    private repository: MarchandRepository;
    private constructor() {
        this.repository = MarchandRepository.getInstance();
    }

    // Business logic

    /**
     * Return a promise which contains an array of marchand.
     */
    getAll(): Promise<Marchand[]> {
        return this.repository.findAll();
    }

    /**
     * Return a promise which contains the marchand relative to the id in parameter.
     * @param id marchand id
     */
    getById(id: number): Promise<Marchand> {
        return this.repository.findById(id);
    }

    /**
     * Create a new marchand and return a promise which contains the created marchand.
     * @param marchand marchand to create
     */
    create(marchand: any): Promise<Marchand> {
      return this.repository.insert(marchand);
    }

    /**
     * Update the marchand in parameter and return a promise which contains the updated marchand.
     * @param marchand marchand to update
     */
    update(marchand: any): Promise<Marchand> {
      return this.repository.update(marchand);
    }

    /**
     * Delete the marchand related to the id in parameter. Return an empty promise.
     * @param id marchand id
     */
    delete(id: number): Promise<any> {
      return this.repository.delete(id);
    }
}
