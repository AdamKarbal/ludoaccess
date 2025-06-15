export interface Collidable {
  x:number;
  y:number;
  width:number;
  height:number;
  action?:(cible:Collidable) => void;
}
