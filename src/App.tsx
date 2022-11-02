import React, {useEffect, useState} from 'react';

import './App.css';

import {RankHandler, WordsByRank} from "./logic/rank-handler";
import Input from "./components/input";
import Stars from "./components/stars";
import {orderBy} from 'lodash';

// default value
export const defaultText = "car car bicycle car bicycle car bicycle car bicycle car bicycle car bicycle plane plane truck";

function App() {
    const [wordsByRank, setRanks] = useState<WordsByRank>({});

    const updateRanks = (text: string) => {
        const appearances = RankHandler.getAppearances(text);

        console.log(appearances);

        const ranks = RankHandler.calculateRanks(appearances);

        console.log(ranks);

        setRanks(ranks);
    };

    useEffect(() => {
        updateRanks(defaultText);
    }, []);

    const sortedRanks = orderBy(Object.keys(wordsByRank), undefined, ['desc']);

    return (
        <div className="App">
            <Input onChange={updateRanks}/>
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
