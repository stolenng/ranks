import {max} from "lodash";

export type AppearanceCount = {[key: string]: number};
export type WordsByRank = {[key: string]: string[]};

export class RankHandler {
    static getAppearances(text: string):  AppearanceCount{
        const appearances: AppearanceCount = {};

        text.trim().split(' ').forEach(word => {
            if (appearances[word]) {
                appearances[word]++;
            } else {
                appearances[word] = 1;
            }
        });

        return appearances;
    }

    static calculateRanks(appearances: AppearanceCount, maxRank = 5): WordsByRank {
        const ranks: WordsByRank = {};

        const maxAppearances = max(Object.values(appearances)) || 0;

        Object.keys(appearances).forEach(word => {
            const currentValue = appearances[word];

            const rank = Math.ceil((currentValue/maxAppearances)*maxRank);

            if (ranks[rank]) {
                ranks[rank].push(word);
            } else {
                ranks[rank] = [word];
            }
        });

        return ranks;
    }
}