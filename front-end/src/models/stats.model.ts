import {Progression} from "./progression.model";
import {Interaction} from "./interaction.model";
import {Child} from "./child.model";
export interface UserStats{
  child: Child;
  listLetterErrors: {
    [letter: string]: number;
  };

  errorOcurrencesByPosition: {
    [wordLength: string]: {
      [position: string]: number;
    };
  };
  progression: Progression[];
  interaction: Interaction[];
}
