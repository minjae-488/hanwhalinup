export default class BaseSystem {
    constructor() {
        // [1st Base, 2nd Base, 3rd Base]
        // 0: Empty, 1: Occupied by Runner
        // In advanced version, could store Player objects instead of 1.
        this.bases = [0, 0, 0];
        this.score = 0;
    }

    reset() {
        this.bases = [0, 0, 0];
        this.score = 0;
    }

    getBases() {
        return [...this.bases];
    }

    // Helper for testing setup
    forceLoadBases(state) {
        this.bases = [...state];
    }

    /**
     * Advance runners based on hit type.
     * @param {string} hitType - 'single', 'double', 'triple', 'homerun', 'walk'
     * @returns {number} runsScored - Number of runs scored in this play
     */
    advanceRunners(hitType) {
        let runsScored = 0;
        const currentBases = [...this.bases];
        let newBases = [0, 0, 0];

        switch (hitType) {
            case 'walk':
            case 'hbp': // Hit by Pitch behaves like Walk
                // If 1st is empty, batter goes to 1st.
                // If 1st occupied, force advance.
                if (currentBases[0] === 0) {
                    newBases = [1, currentBases[1], currentBases[2]];
                } else {
                    // 1st occupied
                    if (currentBases[1] === 0) {
                        // 2nd empty -> [1, 1, 3B]
                        newBases = [1, 1, currentBases[2]];
                    } else {
                        // 1st, 2nd occupied
                        if (currentBases[2] === 0) {
                            // 3rd empty -> [1, 1, 1]
                            newBases = [1, 1, 1];
                        } else {
                            // Bases loaded -> Everyone advances, 1 run scores
                            runsScored = 1;
                            newBases = [1, 1, 1];
                        }
                    }
                }
                break;

            case 'single':
                // Batter to 1st
                newBases[0] = 1;

                // Runner on 3rd scores
                if (currentBases[2] === 1) runsScored++;

                // Runner on 2nd scores (Simplification: aggressive running)
                // In full simulation, this would use probabilities (Score from 2nd on Single?)
                if (currentBases[1] === 1) runsScored++; // Often scores, sometimes stops at 3rd. Let's assume scores for MVP.

                // Runner on 1st goes to 2nd (Standard) or 3rd (Aggressive)
                // MVP: Moves to 2nd
                if (currentBases[0] === 1) newBases[1] = 1;
                break;

            case 'double':
                // Batter to 2nd
                newBases[1] = 1;

                // Runner on 3rd scores
                if (currentBases[2] === 1) runsScored++;
                // Runner on 2nd scores
                if (currentBases[1] === 1) runsScored++;
                // Runner on 1st scores (Usually scores on double)
                if (currentBases[0] === 1) runsScored++;
                break;

            case 'triple':
                // Batter to 3rd
                newBases[2] = 1;

                // All runners score
                runsScored += currentBases[0] + currentBases[1] + currentBases[2];
                break;

            case 'homerun':
                // Batter scores
                runsScored = 1;

                // All runners score
                runsScored += currentBases[0] + currentBases[1] + currentBases[2];

                // Bases cleared
                newBases = [0, 0, 0];
                break;

            default:
                // Out or other event: Bases don't change by default here (Outs handled in GameState)
                // Tagging up logic omitted for MVP
                newBases = currentBases;
                break;
        }

        this.bases = newBases;
        this.score += runsScored;
        return runsScored;
    }
}
