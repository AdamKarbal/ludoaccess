import { Animationconfig } from './animation.model';
export interface AnimationStates {
  stand: Animationconfig;
  run: Animationconfig;
  runReversed: Animationconfig;
  jump: Animationconfig;
  jumpReversed: Animationconfig;
}