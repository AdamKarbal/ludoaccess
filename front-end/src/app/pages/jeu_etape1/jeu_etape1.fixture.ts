import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class Step1Fixture extends E2EComponentFixture {

  typeCurrentWord = async () => {
    const letters = await this.page.$$eval('#mot .letter', spans =>
      spans.map(span => span.textContent?.trim() || '')
    );
    for (const letter of letters) {
      await this.page.keyboard.type(letter);
    }
  }


}
