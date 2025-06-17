import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AcFixture extends E2EComponentFixture {
  getBoutonJouer(){
    return this.page.getByRole('button', { name: 'Jouer' });
  }

  getBoutonDeconnexion(){
    return this.page.getByRole('button', { name: 'Deconnexion' });
  }

}

