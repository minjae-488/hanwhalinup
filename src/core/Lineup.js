export default class Lineup {
    constructor(players) {
        // Validation relaxed for Editor Mode.
        // We rely on main.js handleRerun() to check for 9 players before sim.
        this.players = players;
    }

    // The original setPlayers method with strict validation is removed as per the instruction
    // to relax validation and the new constructor directly assigns players.

    calculateTotalExpectedRuns() {
        if (!this.players || this.players.length === 0) return 0;
        // Skip calculation if partial lineup
        if (this.players.some(p => !p)) return 0;
        // This method's return value in the instruction seems incorrect for "calculateTotalExpectedRuns".
        // Assuming the intent was to return a boolean based on length, but for a calculation,
        // it would typically involve summing expected runs from players.
        // For now, faithfully implementing the provided return statement.
        return this.players.length === 9;
    }

    validate() {
        return this.players.length === 9;
    }

    /**
     * Get player at specific batting order index
     * @param {number} index 0-8
     * @returns {Player}
     */
    getBatterAt(index) {
        return this.players[index];
    }

    /**
     * Swap two players in the lineup
     * @param {number} index1 
     * @param {number} index2 
     */
    swap(index1, index2) {
        const temp = this.players[index1];
        this.players[index1] = this.players[index2];
        this.players[index2] = temp;
    }

    /**
     * Create a clone of this lineup
     * @returns {Lineup}
     */
    clone() {
        return new Lineup([...this.players]);
    }
}
