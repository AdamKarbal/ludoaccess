import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import {Locator} from "@playwright/test";

export class Reglage extends E2EComponentFixture {

  getButtonRetourReglages() {
    return this.page.getByRole('button', { name: '◀ Retour' });
  }

  regalageEnfantaModifier(name: string) {
    return this.page
      .locator('app-child', { hasText: name })
      .locator('div.child')
      .click();
  }

  getFirstPlayerInReglage() {
    return this.page.locator('app-child-list .child-info').first();
  }

  goToWords = async() => {
    const bouton = await this.page.getByRole('button', { name: 'Mots' });
    return bouton.click();
  }
  getSupprimer(path:Locator){
    return path.getByRole('button', { name: 'Supprimer' });
  }
  getAllChilds(){
    return this.page.locator('app-child');
  }
  getFirstSupprimer(){
    return this.page.getByRole('button', { name: 'Supprimer' }).first();
  }
  getButtonAjouterEnfant() {
    return this.page.getByRole('button', { name: 'Ajouter un enfant' });
  }
  clickEnfantFirstChild() {
    return this.page.getByRole('button', { name: '📊 Stats' }).first();
  }

}

