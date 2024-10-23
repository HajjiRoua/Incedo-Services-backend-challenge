import path from 'path';
import { ApiService } from '../api/apiService';
import { SearchArtistRequest } from '../models/searchArtistRequest';
import { CustomError} from '../models/customError';
import { ARTISTS_CSV_OUTPUT_FOLDER } from "../constants/apiConstants";
import randomArtistsData from '../assets/randomArtistNames.json';
import { promises as fs } from 'fs';
import { Parser } from 'json2csv';
import { Artist } from '../models/ValidationSchemas';

export class ArtistService {
    private artistApiService: ApiService;

    constructor() {
        this.artistApiService = new ApiService();
    }

    public async findArtistsByName(searchParams: SearchArtistRequest) {
        try {
            const { artistName, page, filename } = searchParams;
            const pageNumber = page || 1;
            const searchResult = await this.artistApiService.fetchArtistData(artistName, pageNumber);
            const { artists } = searchResult;

            if (artists.length) {
                const filePath = path.join(process.cwd(), ARTISTS_CSV_OUTPUT_FOLDER);
                await this.writeToArtistsCsvFile(artists, filePath, artistName, filename);
                return { artists };
            }
            return { artists: await this.getRandomArtistsFromJson() };
        } catch (e) {
            throw new CustomError("An error occurred while processing your request. Please try again later.", 500);
        }
    }

    private async writeToArtistsCsvFile(
        artists: Artist[],
        outputDir: string,
        artistName: string,
        filename?: string
    ): Promise<void> {
        const directory = path.resolve(outputDir);
        const filePath = path.join(directory, filename ? `${filename}.csv` : `${artistName}.csv`);
        try {
            await fs.access(filePath);
            console.log(`File already exists at: ${filePath}`);
            return;
        } catch {
        }
        try {
            const fields = ['name', 'mbid', 'url', 'smallImage', 'image'];
            const parser = new Parser({ fields });
            const data = artists.map(artist => ({
                name: artist.name,
                mbid: artist.mbid || '',
                url: artist.url,
                smallImage: artist.smallImage || '',
                image: artist.image || ''
            }));
            const csv = parser.parse(data);
            await fs.writeFile(filePath, csv);
            console.log(`CSV file created successfully at: ${filePath}`);
        } catch (error) {
            throw new CustomError(`Error writing CSV file`, 500);
        }
    }

    private async getRandomArtistsFromJson(): Promise<string[]> {
        const artistsArray: string[] = randomArtistsData;
        const randomArtists: string[] = [];
        const numberOfArtistsToSelect = 10;
        while (randomArtists.length < numberOfArtistsToSelect) {
            const randomIndex = Math.floor(Math.random() * artistsArray.length);
            const artistName = artistsArray[randomIndex];
            if (!randomArtists.includes(artistName)) {
                randomArtists.push(artistName);
            }
        }
        return randomArtists;
    }
}
