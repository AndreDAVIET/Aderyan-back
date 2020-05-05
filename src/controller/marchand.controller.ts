import { Marchand } from './../models/marchand';
import { MarchandService } from './../services/marchand.service';
import express, { Router, Request, Response, Application } from 'express';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controller est la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const MarchandController = (app: Application) => {

    const router: Router = express.Router();
    const marchandService = MarchandService.getInstance();

    /**
     * Return all marchands in JSON
     */
    router.get('/', (req: Request, res: Response) => {
        marchandService.getAll().then(results => {
            res.send(results);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Return only one marchand in JSON relative to its id
     */
    router.get('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      marchandService.getById(id).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Create a new marchand from a JSON body and return the created marchand in JSON.
     */
    router.post('/', (req: Request, res: Response) => {
      const marchand: Marchand = req.body; // Automatically transform in a Marchand object

      marchandService.create(marchand).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Update a marchand relative to its id and return the updated marchand in JSON.
     */
    router.put('/:id', (req: Request, res: Response) => {
      const marchand: Marchand = req.body; // req.params.id is automatically set into the body

      marchandService.update(marchand).then(result => {
            res.send(result);
        })
        .catch(err => {
          console.log(err);
        })
    });

    /**
     * Delete a marchand relative its id.
     */
    router.delete('/:id', (req: Request, res: Response) => {
      const id = parseInt(req.params.id);

      marchandService.delete(id).then(result => {
            res.send();
        })
        .catch(err => {
          console.log(err);
        })
    });

    app.use('/marchand', router);
};
