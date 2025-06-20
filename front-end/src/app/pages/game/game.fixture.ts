import { E2EComponentFixture } from "e2e/e2e-component.fixture";

export class GameFixture extends E2EComponentFixture {
    platforms: Awaited<ReturnType<typeof this.page.locator>>[] = [];

    player = this.page.locator('.player');

    async initPlatforms() {
        this.platforms = await this.page.locator('.platform').all();
    
    }

    platform(index: number) {
        return this.platforms[index].boundingBox().then(box => {
            if (box) {
                return { x: box.x, y: box.y, width: box.width, height: box.height };
            }   
            return null;
    });}

    playerPosition() {
        return this.player.boundingBox().then(box => {
            if (box) {
                return { x: box.x, y: box.y, width: box.width, height: box.height };
            }
            return null;
    });}

    getDisconnect(){
        return this.page.locator('#cross');
;
    }

    getConfirmDisconnect() {
        return this.page.getByRole('button', { name: 'OUI' });}

}
