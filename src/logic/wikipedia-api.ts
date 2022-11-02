import axios from 'axios';

export default class WikipediaApi {
    static async getTextByWords(words: string[]) {
        const textByWords: {[key: string]: string} = {};

        const promises = words.map(word => {
            return WikipediaApi.getWikipediaText(word).then(text => {
               textByWords[word] = text;
            });
        });

        await Promise.all(promises);

        return textByWords;
    }

    static async getWikipediaText(text: string) {
        try {
            const requestUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${text}&format=json&origin=*`;

            const response = await axios.get(requestUrl);
            const json = response.data;

            const pages = json.query.pages;
            const firstPage = Object.keys(pages)[0];
            const page = pages[firstPage];

            return page.extract;
        } catch (e) {
            console.error(`Failed getting text for word: ${text}`, e);
            return `Failed to get text`;
        }
    }
}