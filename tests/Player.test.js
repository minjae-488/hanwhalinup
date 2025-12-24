import Player from '../src/core/Player.js';

describe('Player Class', () => {
    const mockStats = {
        avg: 0.300,
        obp: 0.400,
        slg: 0.500,
        ops: 0.900,
        probability: {
            single: 0.20,
            double: 0.05,
            triple: 0.01,
            homerun: 0.04,
            walk: 0.10,
            strikeout: 0.15,
            groundout: 0.25,
            flyout: 0.20
        }
    };

    test('should create a player instance with correct attributes', () => {
        const player = new Player('p001', 'Test Batter', '1B', 'R', mockStats);

        expect(player.id).toBe('p001');
        expect(player.name).toBe('Test Batter');
        expect(player.position).toBe('1B');
        expect(player.hand).toBe('R');
        expect(player.stats).toEqual(mockStats);
    });

    test('should return on-base probability correctly', () => {
        const player = new Player('p001', 'Test Batter', '1B', 'R', mockStats);
        // OBP is explicitly given in stats for this MVP level, but let's check if we can retrieve specific event probs
        expect(player.stats.obp).toBe(0.400);
    });

    test('should return detailed event probabilities', () => {
        const player = new Player('p001', 'Test Batter', '1B', 'R', mockStats);
        const probs = player.getSimulationProbabilities();

        expect(probs.single).toBe(0.20);
        expect(probs.homerun).toBe(0.04);
        // Check if sum is approx 1.0 (it should be for a valid probability set, though logic might handle normalization)
        const sum = Object.values(probs).reduce((a, b) => a + b, 0);
        expect(sum).toBeCloseTo(1.0);
    });
});
