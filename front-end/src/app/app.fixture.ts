import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class AppFixture extends E2EComponentFixture {

  getTitle() {
    return this.page.getByRole('heading', { name: 'Hello World!' });
  }

  getDescription() {
    return this.page.getByText('Start your first app!', { exact: true });
  }

  getShowButton() {
    return this.page.getByRole('button', { name: 'Show success!' });
  }

  clickOnShowButton() {
      return this.getShowButton().click();
  }

  getSuccessMessage() {
    return this.page.getByText('Wow!');
  }

  getBoutonConnexion() {
    return this.page.getByRole('button', { name: /se connecter/i });
  }

  getBoutonErgotherapeute() {
    return this.page.getByRole('heading', { name: /Ergothérapeute/i }).locator('..');
  }

  getBoutonEnfant(name: string) {
    return this.page.getByRole('heading', { name: name }).locator('..');
  }

  async loginErgotherapeute() {
    await this.getBoutonErgotherapeute().click();
    await this.getBoutonConnexion().click();
  }
  async loginPlayer(name: string) {
    await this.getBoutonEnfant(name).click();
    await this.getBoutonConnexion().click();
  }
  loginFirstPlayer() {
    return this.page.locator('app-listofpeople .person-info').first().click()
      .then(() => this.getBoutonConnexion().click());
  }

  getBoutonJouer(){
    return this.page.getByRole('button', { name: 'Jouer' });
  }
  getFirstPlayerInReglage() {
    return this.page.locator('app-child-list .child-info').first();
  }

  getButtonRetourReglages() {
    return this.page.getByRole('button', { name: '◀ Retour' });
  }

  regalageEnfantaModifier(name: string) {
    return this.page
      .locator('app-child', { hasText: name })   // limite à la bonne carte
      .locator('div.child')
      .click();;
  }

}
