import { Request, Response } from 'express';
import { ArtistService } from '../services/artistService';
import {SearchNameRequestSchema} from '../models/ValidationSchemas';
import { z } from "zod";
import {CustomError} from "../models/customError";

export class ArtistController {
    private artistService: ArtistService;

    constructor() {
        this.artistService = new ArtistService();
    }

    public async searchArtist(req: Request, res: Response): Promise<void> {
        try {
            const searchParams = SearchNameRequestSchema.parse(req.body);
            const artists = await this.artistService.findArtistsByName(searchParams);
            res.status(200).json(artists);
        } catch (error) {
            if (error instanceof CustomError ) {
                res.status(error.code).json(error.toJson());
                return;
            }
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    message: "Invalid Input: Zod validation failed.",
                    errors: error.errors,
                });
                return;
            }
            res.status(500).json({ message: "An unexpected error occurred." });
            return;
        }
    }
}
