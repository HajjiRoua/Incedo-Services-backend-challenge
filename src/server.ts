import express, { Application, Request, Response, NextFunction } from 'express';
import artistRoutes from './routes/artistRoutes';
import dotenv from 'dotenv';

class Server {
    public app: Application;

    private port: string | number;

    constructor() {
        dotenv.config();

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }

    private initializeMiddlewares(): void {
        this.app.use(express.json());
    }

    private initializeRoutes(): void {
        this.app.use('/api/artist', artistRoutes);
    }

    private initializeErrorHandling(): void {
        this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
            console.error(err.stack);
            res.status(500).json({ error: 'Something went wrong! Please try again later.' });
        });
    }

    public listen(): void {
        const server = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
        process.on('SIGTERM', () => {
            server.close(() => {
                console.log('Process terminated');
            });
        });
    }
}

const server = new Server();
server.listen();
