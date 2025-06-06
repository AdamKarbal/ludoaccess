import { UserStats} from "../models/stats.model";

export const mockUserStats :UserStats= {
  child: { id:1,firstName: "Olivier",lastName:"Boulet",level:500,frequency:5,age:8,role:"child" },
  nbError: 15,
  listLetterErrors:{
    "a":1,
    "b":2,
    "c":3,
    "d":4,
    "e":5,
    "f":6,
    "g":7,
    "h":8,
    "i":9,
    "j":10,
    "k":11,
    "l":12,
    "m":13,
    "n":14,
    "o":15,
    "p":16,
    "q":17,
    "r":18,
    "s":19,
    "t":20,
    "u":21,
    "v":22,
    "w":23,
    "x":24,
    "y":25,
    "z":26
  },
  errorOcurrencesByPosition:{
    5:{
      "1":2,
      "2":5,
      "3":7,
      "4":8,
      "5":9
    },
    7:{
      "1":2,
      "2":5,
      "3":7,
      "4":8,
      "5":9
    },
    6:{
      "1":2,
      "2":5,
      "3":7,
      "4":8,
      "5":9
    }
  },
  nbFailed: [2, 1, 3],
  progression: [
    { word:"Taxi", completed: true, nbError:0,timeSpent: 300 },
    { word:"Arbre", completed: false, nbError:3,timeSpent: 400 },
  ],
  interaction: [
    { action: "1ère lettre", success: 10, failures: 200},
    { action: "Mots avec lettres similaires", success: 200 , failures: 400},
    {action: "Saut",success:100,failures:400},
    {action:"Collision avec le monstre",success:100,failures:400},
  ],
};


