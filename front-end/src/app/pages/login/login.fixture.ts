import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class LoginFixture extends E2EComponentFixture {

  getBoutonConnexion() {
    return this.page.getByRole('button', { name: "Se connecter" });
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


}
