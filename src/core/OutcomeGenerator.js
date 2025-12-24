export default class OutcomeGenerator {
    constructor() {
        // Can inject Random Number Generator here for better testing/DIP
        this.rng = Math.random;
    }

    /**
     * Generate a discrete outcome based on player probabilities
     * @param {Object} playerStats - Player stats object containing 'probability' map
     * @returns {string} Outcome key (single, double, out, etc.)
     */
    generateOutcome(playerStats) {
        const probs = playerStats.probability || {};
        const rand = this.rng();

        let cumulative = 0;

        // Define standard order of prob checking to match test expectations
        // This relies on the 'probability' object having all these keys.
        // In a real app, strict ordering map is better.
        const eventOrder = [
            'single', 'double', 'triple', 'homerun',
            'walk', 'hbp',
            'strikeout', 'groundout', 'flyout'
        ];

        for (const event of eventOrder) {
            const prob = probs[event] || 0;
            cumulative += prob;
            if (rand < cumulative) {
                return event;
            }
        }

        // Fallback (usually Out)
        return 'out';
    }
}
