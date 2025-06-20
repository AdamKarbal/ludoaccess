import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class WordsFixture extends E2EComponentFixture {

  addWord = async(word : string) => {
    await this.page.locator('button.btn-ajouterMot').click();
    await this.page.getByPlaceholder('Mot').fill(word);
    await this.page.getByTestId('selector').selectOption('Facile');
    await this.page.getByRole('button', { name : 'Valider'}).click();
  }

  deleteWord = async() => {
    await this.addWord("Chaise");
    await this.page.getByTestId('selector2').selectOption('Facile');
    await this.page.locator(`.word-text:has-text("Chaise")`)
      .locator('xpath=..')
      .locator('.delete-btn')
      .click();
  }

  seeEasyWords = async() => {
    await this.page.getByTestId('selector2').selectOption('Facile');
  }

  seeMediumWords = async() =>  {
    await this.page.getByTestId('selector2').selectOption('Moyen');
  }

  seeHardWords = async() =>  {
    await this.page.getByTestId('selector2').selectOption('Difficile');
  }
}
