import GameState from './GameState.js';
import OutcomeGenerator from './OutcomeGenerator.js';

export default class GameSimulator {
    constructor(lineup) {
        this.lineup = lineup;
        this.state = new GameState();
        this.outcomeGenerator = new OutcomeGenerator();
        this.currentBatterIndex = 0; // 0-8

        // Configurable PARK FACTOR (Issue #4)
        // 1.0 is neutral. > 1.0 favors hitter. < 1.0 favors pitcher.
        this.parkFactor = 1.0;
    }

    setParkFactor(factor) {
        this.parkFactor = factor;
    }

    simulateGame() {
        this.state = new GameState();
        this.currentBatterIndex = 0;

        while (!this.state.isGameOver()) {
            this.playInning();
        }

        return {
            score: this.state.score,
            innings: this.state.inning,
            isWin: this.state.score > 4.5 // Avg runs approx 4.5. Simple win condition for now (vs League Avg)
        };
    }

    playInning() {
        const currentInning = this.state.inning;

        while (this.state.inning === currentInning && !this.state.isGameOver()) {
            this.playAtBat();
        }
    }

    playAtBat() {
        const batter = this.lineup.getBatterAt(this.currentBatterIndex);

        // 1. Generate Outcome
        // TODO: Apply Park Factor to stats here if needed (e.g. increase HR prob)
        const outcome = this.outcomeGenerator.generateOutcome(batter.stats);

        // 2. Process Outcome
        if (['single', 'double', 'triple', 'homerun', 'walk', 'hbp'].includes(outcome)) {
            // Hit or Walk
            const runs = this.state.baseSystem.advanceRunners(outcome);
            this.state.addScore(runs);
        } else {
            // Out
            this.state.addOut();
        }

        // 3. Next Batter
        this.currentBatterIndex = (this.currentBatterIndex + 1) % 9;
    }
}
