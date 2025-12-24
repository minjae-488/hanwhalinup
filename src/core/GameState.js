import BaseSystem from './BaseSystem.js';

export default class GameState {
    constructor() {
        this.inning = 1;
        this.outs = 0;
        this.score = 0;
        this.baseSystem = new BaseSystem();
        this.MAX_INNINGS = 9;
    }

    addOut() {
        this.outs++;
        if (this.outs >= 3) {
            this.changeInning();
        }
    }

    changeInning() {
        this.outs = 0;
        this.inning++;
        this.baseSystem.reset();
    }

    addScore(runs) {
        this.score += runs;
        // Also sync with BaseSystem if needed, but BaseSystem tracks its own logic run-by-run.
        // Usually simulator adds score to State based on BaseSystem return value.
    }

    getBases() {
        return this.baseSystem.getBases();
    }

    isGameOver() {
        return this.inning > this.MAX_INNINGS;
    }
}
