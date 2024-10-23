import axios from 'axios';
import { SEARCH_ARTIST_METHOD, API_LIMIT } from '../constants/apiConstants';
import { CustomError } from '../models/customError';
import { ResearchResponseSchema } from '../models/ValidationSchemas';

export class ApiService {
    public async fetchArtistData(artistName: string, page: number) {
        try {
            const response = await axios.get(`${process.env.API_URL}`, {
                params: {
                    method: SEARCH_ARTIST_METHOD,
                    artist: artistName,
                    limit: API_LIMIT,
                    page: page,
                    api_key: process.env.API_KEY,
                    format: 'json'
                }
            });
            return ResearchResponseSchema.parse(response.data);
        } catch (e) {
            console.error(e);
            throw new CustomError ("An error occurred while fetching artist data, please retry later", 500);
        }
    }
}
