export default class Lineup {
    constructor(players) {
        this.setPlayers(players);
    }

    setPlayers(players) {
        if (!Array.isArray(players) || players.length !== 9) {
            throw new Error('Lineup must consist of exactly 9 players');
        }
        this.players = [...players]; // Logic copy
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
