import Optimizer from '../src/core/Optimizer.js';
import Lineup from '../src/core/Lineup.js';
import Player from '../src/core/Player.js';

describe('Optimizer (Genetic Algorithm)', () => {
    let dummyPlayers;
    let baseLineup;

    beforeEach(() => {
        dummyPlayers = Array.from({ length: 9 }, (_, i) =>
            new Player(`p${i}`, `Player ${i}`, 'POS', 'R', {
                probability: { single: 0.1 * (i + 1) } // Different stats to differentiate lineups
            })
        );
        baseLineup = new Lineup(dummyPlayers);
    });

    test('should generate initial population', () => {
        const optimizer = new Optimizer(baseLineup);
        const population = optimizer.generateInitialPopulation(10);
        expect(population.length).toBe(10);
        expect(population[0]).toBeInstanceOf(Lineup);
        // Check diversity? (At least one should be different order)
    });

    test('should calculate fitness for a lineup', () => {
        const optimizer = new Optimizer(baseLineup);
        // Mock simulation to be faster
        optimizer.simulatorRunner = (lineup) => {
            // Simplified fitness function for test: Sum of player indices in first 3 spots
            // Real one uses GameSimulator
            let val = 0;
            for (let i = 0; i < 3; i++) val += parseInt(lineup.getBatterAt(i).id.substring(1));
            return val;
        };

        const fitness = optimizer.evaluateFitness(baseLineup);
        expect(fitness).toBeGreaterThanOrEqual(0);
    });

    test('should perform crossover (swap logic)', () => {
        const optimizer = new Optimizer(baseLineup);
        const parent1 = baseLineup.clone();
        const parent2 = baseLineup.clone();
        parent2.swap(0, 8); // Make parent2 different

        const child = optimizer.crossover(parent1, parent2);

        expect(child.players.length).toBe(9);
        // Validate child has no duplicates
        const ids = new Set(child.players.map(p => p.id));
        expect(ids.size).toBe(9);
    });

    test('should mutate lineup', () => {
        const optimizer = new Optimizer(baseLineup);
        const original = baseLineup.clone();
        const mutated = optimizer.mutate(original);

        expect(mutated.players.length).toBe(9);
        // Mutation might not happen if rate is low, but with rate 1.0 it should change
        // We'll force rate in implementation or assume default small change
    });

    // Integration-like test for full run
    test('optimize() should return a lineup', async () => {
        const optimizer = new Optimizer(baseLineup);

        // Use a tiny config for speed test
        const config = {
            generations: 2,
            populationSize: 4,
            simulationsPerLineup: 1 // Very fast evaluation
        };

        const result = await optimizer.optimize(config);
        expect(result).toBeInstanceOf(Lineup);
    });
});
