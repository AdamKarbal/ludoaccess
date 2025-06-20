import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class ToolbarGameFixture extends E2EComponentFixture {

  pauseGame(){
    const pauseBut = this.page.locator('div.toolbar#pause');
    pauseBut.click();
  }

  goToParams = async() => {
    await this.pauseGame();
    this.page.getByRole('button', { name : 'PARAMÈTRES'});
  }

  leaveParams = async() => {
    await this.pauseGame();
    this.page.getByRole('button', { name:'Retour'});
  }

 /* putVolumeTo = async (val: number) => {
    await page.$eval('input#volume', (el, val) => {
      el.value = val;
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    }, val.toString());
  } */

  leavePause = async() => {
    await this.pauseGame();
    this.page.getByRole('button', { name : 'REPRENDRE'});
  }

  goToLeave(){
    const crossBut = this.page.locator('div.toolbar#cross');
    crossBut.click();
  }

  leaveGame = async() => {
    await this.goToLeave();
    this.page.getByRole('button', { name : 'OUI' });
  }

  cancelLeave = async() => {
    await this.goToLeave();
    this.page.getByRole('button', { name : 'NON' });
  }

  displayInfo = async() => {
    const infoBut = this.page.locator('div.toolbar#infoB');
    infoBut .click();
  }

  closeInfo = async() => {
    await this.displayInfo();
    this.page.getByRole('button', {name : '.close-button'});
  }

}
