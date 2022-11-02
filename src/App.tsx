import React, { useEffect, useState} from 'react';

import './App.css';

import {RankHandler, WordsByRank} from "./logic/rank-handler";
import Input from "./components/input";
import Stars from "./components/stars";
import {orderBy, debounce} from 'lodash';
import WikipediaApi from "./logic/wikipedia-api";

// default value
export const defaultText = "car car bicycle car bicycle car bicycle car bicycle car bicycle car bicycle plane plane truck";

function App() {
    const [wordsByRank, setRanks] = useState<WordsByRank>({});
    const [textByWord, setTexts] = useState<{[key: string]: string}>({});

    const updateRanks = (text: string) => {
        const appearances = RankHandler.getAppearances(text);
        const wordsToFetch = Object.keys(appearances).filter((word) => !textByWord[word]);

        WikipediaApi.getTextByWords(wordsToFetch).then(result => setTexts({...textByWord, ...result}))

        console.log(`Word appearances:`, appearances);

        const ranks = RankHandler.calculateRanks(appearances);

        console.log(`Words by rank:`, ranks);

        setRanks(ranks);
    };

    useEffect(() => {
        updateRanks(defaultText);
        // eslint-disable-next-line
    }, []);

    const sortedRanks = orderBy(Object.keys(wordsByRank), undefined, ['desc']);

    console.log(`Wikipedia text by words:`, textByWord)

    const debouncedUpdateRanks = debounce(updateRanks, 500);

    return (
        <div className="App">
            <Input onChange={debouncedUpdateRanks}/>
            <table style={{ width: '100%'}} >
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Text</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        sortedRanks.map(rank => {
                            const currentWords = wordsByRank[rank];
                            const sortedWords = orderBy(currentWords, undefined, ['asc']);

                            return sortedWords.map(word => {
                                return (
                                    <tr key={word}>
                                        <td>{word}(<Stars stars={Number(rank)}/>)</td>
                                        <td>
                                            <span dangerouslySetInnerHTML={{__html: textByWord[word]}}/>
                                        </td>
                                    </tr>
                                )
                            });
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default App;
