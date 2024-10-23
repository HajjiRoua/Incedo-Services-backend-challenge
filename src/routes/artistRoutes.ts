import express, { Request, Response } from 'express';
import { ArtistController } from '../controllers/artistController';

export class ArtistRoutes {
    private router = express.Router();
    private artistController = new ArtistController();

    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.get('/search', (req: Request, res: Response) => this.artistController.searchArtist(req, res));
    }
    public getRouter(): express.Router {
        return this.router;
    }
}

export default new ArtistRoutes().getRouter();