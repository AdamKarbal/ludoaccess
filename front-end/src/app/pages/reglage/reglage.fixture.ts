import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class Reglage extends E2EComponentFixture {

  getButtonRetourReglages() {
    return this.page.getByRole('button', { name: '◀ Retour' });
  }

  regalageEnfantaModifier(name: string) {
    return this.page
      .locator('app-child', { hasText: name })   // limite à la bonne carte
      .locator('div.child')
      .click();
  }
  
getFirstPlayerInReglage() {
    return this.page.locator('app-child-list .child-info').first();
  }
  
}

