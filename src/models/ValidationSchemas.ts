import { z } from 'zod';
import {NUMBER_REGEX} from "../constants/common";

const ArtistResponseSchema = z
    .object({
        name: z.string(),
        url: z.string().url(),
        mbid: z.string(),
        image: z.array(
            z.object({
                "#text": z.string(),
                size: z.string(),
            })
        ),
    })
    .transform((artist) => {
        const imageMap: Map<string, string> = new Map();
        const images = artist.image;
        for (const image of images) {
            if (image.size === "small" || image.size === "mega") {
                imageMap.set(image.size, image["#text"]);
            }
        }
        return {
            name: artist.name,
            url: artist.url,
            mbid: artist.mbid,
            smallImage: imageMap.get("small") ?? "",
            image: imageMap.get("mega") ?? "",
        };
    });


export const ResearchResponseSchema = z
    .object({
        results: z.object({
            "opensearch:totalResults": z
                .string()
                .regex(NUMBER_REGEX, { message: "A number is required" })
                .transform((val) => Number(val)),
            artistmatches: z.object({
                artist: z.array(ArtistResponseSchema),
            }),
        }),
    })
    .transform((result) => {
        return {
            totalResults: result.results["opensearch:totalResults"],
            artists: result.results.artistmatches.artist,
        };
    });
export type Artist = z.infer<typeof ArtistResponseSchema>;


export const SearchNameRequestSchema = z.object({
    artistName: z.string(),
    page: z.number().optional(),
    filename: z.string().optional(),
});