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

  loginErgotherapeute() {
    return this.getBoutonErgotherapeute().click()
      .then(() => this.getBoutonConnexion().click());
  }
  loginPlayer(name: string) {
    return this.page.getByRole('heading', { name: name }).locator('..').click()
      .then(() => this.getBoutonConnexion().click());
  }

  regalageEnfantaModifier(name: string) {
    return this.page
  .locator('app-child', { hasText: name })   // limite à la bonne carte
  .locator('div.child')        
  .click();;
  }

  getButtonRetourReglages() {
    return this.loginErgotherapeute()
      .then(() => this.page.getByRole('button', { name: 'Retour' }));
  }

  getButtonJouer() {
    return this.page.getByRole('button', { name: 'Jouer' });
  }
  jouer(name: string) {
    return this.loginPlayer(name)
      .then(() => this.getButtonJouer().click());
  }


}
