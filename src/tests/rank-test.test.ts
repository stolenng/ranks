import {RankHandler} from "../logic/rank-handler";
import {defaultText} from "../App";

const appearances = {
    "car": 7,
    "bicycle": 6,
    "plane": 2,
    "truck": 1
};

describe('Rank Tests', () => {
   it('should return correct appearances', () => {
         const result = RankHandler.getAppearances(defaultText);

         expect(result).toEqual(appearances);
   });

   it('should ignore empty spaces', () => {
       const result = RankHandler.getAppearances('test       test');

       expect(result).toEqual({
           test: 2
       });
   });

   it('should return correct ranks', () => {
       const result = RankHandler.calculateRanks(appearances);

       expect(result).toEqual({
           "1": [
               "truck"
           ],
           "2": [
               "plane"
           ],
           "5": [
               "car",
               "bicycle"
           ]
       });
   });
});