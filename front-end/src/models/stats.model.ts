import {Progression} from "./progression.model";
import {Interaction} from "./interaction.model";
import {Child} from "./child.model";
export interface UserStats{
  child: Child;
  nbError: number;
  listLetterErrors: {};
  errorOcurrencesByPosition:{};
  nbFailed: number[];
  progression: Progression[];
  interaction: Interaction[];
}
