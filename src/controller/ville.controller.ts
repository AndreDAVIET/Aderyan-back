import { Ville } from './../models/ville';
import { VilleService } from './../services/ville.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const VilleController = (app: Application) => {

    const router: Router = express.Router();
    const villeService = VilleService.getInstance();

    /**
     * Return all villes in JSON
     */
    router.get('/', (req: Request, res: Response) => {
        villeService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one ville in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      villeService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new ville from a JSON body and return the created ville in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const ville: Ville = req.body; // Automatically transform in a ville object

      villeService.create(ville).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a ville relative to its id and return the updated ville in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const ville: Ville = req.body; // req.params.id is automatically set into the body

      villeService.update(ville).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a ville relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      villeService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/ville', router);
};