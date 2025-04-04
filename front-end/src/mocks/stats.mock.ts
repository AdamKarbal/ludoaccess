import { UserStats} from "../models/stats.model";

export const mockUserStats :UserStats= {
  child: { id:"1",firstName: "Adam",lastName:"Karbal",playDuration:500,frequency:5,age:8 },
  nbError: 15,
  listLetterErrors: ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s", "t","u","v","w","x","y","z"],
  listNbError: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
  listWordLength: ["5", "7", "6"],
  listErrorOccurences:[2,5,7,8,9],
  listErrorPosition: ["1","2","3","4","5"],
  nbFailed: [2, 1, 3],
  progression: [
    { word:"Taxi", completed: true, nbError:0,timeSpent: 300 },
    { word:"ChatGPT", completed: false, nbError:3,timeSpent: 400 },
  ],
  interaction: [
    { action: "1ère lettre", success: 10, failures: 200 , timeSpent: 300 },
    { action: "Mots avec lettres similaires", success: 200 , failures: 400,timeSpent: 300 },
  ],
};


