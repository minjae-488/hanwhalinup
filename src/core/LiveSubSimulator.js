import GameSimulator from './GameSimulator.js';
import GameState from './GameState.js';

export default class LiveSubSimulator extends GameSimulator {
    constructor(lineup) {
        super(lineup);
    }

    /**
     * Run simulation from a specific context
     * @param {Object} context { inning, outs, bases: [0,1,0], scoreDiff: -1 }
     * @param {number} simulationsCount 
     * @returns {number} Win Probability
     */
    simulateScenario(context, simulationsCount = 1000) {
        let wins = 0;

        for (let i = 0; i < simulationsCount; i++) {
            // Setup specific state
            this.state = new GameState();
            this.state.inning = context.inning;
            this.state.outs = context.outs;
            this.state.baseSystem.forceLoadBases(context.bases);
            this.state.score = 0; // Relative score for this inning remnant?

            // Critical: How to handle existing score?
            // Usually we simulate "Rest of Game" runs added.
            // If explicit scoreDiff is provided, we check if (ExistingRuns + NewRuns) > OpponentRuns.
            // For MVP, let's assume currently tied or use provided scoreDiff (MyScore - OppScore).
            // Win condition: Final Score Diff > 0.

            const initialScoreDiff = context.scoreDiff || 0;

            this.currentBatterIndex = context.batterIndex || 0; // Who is up?

            // Run rest of game
            while (!this.state.isGameOver()) {
                this.playInning();
            }

            const runsScoredInSim = this.state.score;
            if (initialScoreDiff + runsScoredInSim > 0) { // Simple win condition if we assume opponent scores 0 more runs?
                // This is too simple. We need opponent simulation logic for full WPA.
                // For MVP: Let's just calculate "Expected Future Runs" from this state.
                // WPA is hard without opponent modeling.
                // So let's return EXPECTED RUNS added in potential remaining innings.
                wins += (initialScoreDiff + runsScoredInSim > 0 ? 1 : 0);
            }

            // Alternative Metric: Expected Runs from this point (RE24 matrix style)
            // But user asked for Win Probability Change.
            // Let's stick to Win Check assuming Opponent doesn't score more (Simplification).
        }

        return (wins / simulationsCount) * 100;
    }

    // Better Metric for MVP: Expected Runs (RE) 
    // "How many runs will we score from this situation until end of game?"
    calculateExpectedRuns(context, simulationsCount = 500) {
        let totalRuns = 0;
        for (let i = 0; i < simulationsCount; i++) {
            this.state = new GameState();
            this.state.inning = context.inning;
            this.state.outs = context.outs;
            this.state.baseSystem.forceLoadBases(context.bases);
            this.state.score = 0;
            this.currentBatterIndex = 0;

            while (!this.state.isGameOver()) {
                this.playInning();
            }
            totalRuns += this.state.score;
        }
        return totalRuns / simulationsCount;
    }
}
