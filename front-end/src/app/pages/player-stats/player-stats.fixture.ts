import { E2EComponentFixture } from "e2e/e2e-component.fixture";
import { get } from "http";

export class StatsFixture extends E2EComponentFixture {
    getButtonRetourStats() {
        return this.page.getByRole('button', { name: '◀ Retour' });
    }
    getButtonStatsToday() {
        return this.page.getByRole('button', { name: 'Aujourd’hui' });
    }
    getButtonErreurParLettre() {
        return this.page.getByRole('button', { name: 'Erreurs par lettre' });
    }

    getButtonErreurParPosition() {
        return this.page.getByRole('button', { name: 'Erreurs par position dans le mot' });
    }
    getButtonStatsLastWeek() {  
        return this.page.getByRole('button', { name: 'Dernière semaine' });
    }
    getButtonStatsLastMonth() {
        return this.page.getByRole('button', { name: 'Dernier mois' });
    }
}