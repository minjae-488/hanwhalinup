export default class Player {
    constructor(id, name, position, hand, stats) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.hand = hand; // 'L', 'R', 'S'
        this.stats = stats;
        this.condition = 'normal'; // default condition
    }

    /**
     * Returns the detailed probabilities for simulation events
     * @returns {Object} Probability map { single: 0.1, ... }
     */
    getSimulationProbabilities() {
        if (this.stats.probability) {
            return this.stats.probability;
        }

        // Fallback or calculation logic if raw probabilities aren't provided
        // For MVP, we assume preprocessing (Data Pipeline) provides this.
        return {};
    }

    /**
     * Get On Base Probability
     * @returns {number} OBP
     */
    getOBP() {
        return this.stats.obp || 0;
    }
}
