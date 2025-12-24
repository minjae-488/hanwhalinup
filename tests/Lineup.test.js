import Lineup from '../src/core/Lineup.js';
import Player from '../src/core/Player.js';

describe('Lineup Class', () => {
    let players;

    beforeEach(() => {
        // Create 9 dummy players
        players = Array.from({ length: 9 }, (_, i) =>
            new Player(`p${i}`, `Player ${i}`, 'POS', 'R', {})
        );
    });

    test('should accept a valid list of 9 players', () => {
        const lineup = new Lineup(players);
        expect(lineup.validate()).toBe(true);
        expect(lineup.players.length).toBe(9);
    });

    test('should throw error if not 9 players', () => {
        const incompletePlayers = players.slice(0, 8);
        expect(() => {
            new Lineup(incompletePlayers);
        }).toThrow('Lineup must consist of exactly 9 players');
    });

    test('should allow getting player by batting order', () => {
        const lineup = new Lineup(players);
        // Batting order is 1-indexed usually, but array is 0-indexed. 
        // Let's assume method accepts 0-8 for simplicity here, or 1-9.
        expect(lineup.getBatterAt(0).name).toBe('Player 0');
        expect(lineup.getBatterAt(8).name).toBe('Player 8');
    });

    test('should be able to swap batters', () => {
        const lineup = new Lineup(players);
        // Swap 1st (index 0) and 2nd (index 1)
        lineup.swap(0, 1);
        expect(lineup.getBatterAt(0).name).toBe('Player 1');
        expect(lineup.getBatterAt(1).name).toBe('Player 0');
    });
});
