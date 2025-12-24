import GameSimulator from './GameSimulator.js';
import Lineup from './Lineup.js';

export default class Optimizer {
    constructor(baseLineup) {
        this.baseLineup = baseLineup;
    }

    /**
     * Run the Genetic Algorithm to find optimal lineup
     * @param {Object} config 
     */
    async optimize(config = {}) {
        const {
            generations = 50,
            populationSize = 100,
            simulationsPerLineup = 100, // Reduced for MVP speed
            mutationRate = 0.1
        } = config;

        let population = this.generateInitialPopulation(populationSize);

        for (let gen = 0; gen < generations; gen++) {
            // 1. Evaluate Fitness
            const fitnessMap = await this.evaluatePopulation(population, simulationsPerLineup);

            // Sort by fitness (descending)
            const sortedPop = population.map((lineup, idx) => ({
                lineup,
                fitness: fitnessMap[idx]
            })).sort((a, b) => b.fitness - a.fitness);

            // 2. Selection (keep top 20% - Elitism)
            const eliteCount = Math.floor(populationSize * 0.2);
            const elites = sortedPop.slice(0, eliteCount).map(item => item.lineup);

            // 3. New Generation
            const children = [];
            while (elites.length + children.length < populationSize) {
                // simple random parent selection from top 50%
                const p1 = sortedPop[Math.floor(Math.random() * (populationSize / 2))].lineup;
                const p2 = sortedPop[Math.floor(Math.random() * (populationSize / 2))].lineup;

                let child = this.crossover(p1, p2);
                if (Math.random() < mutationRate) {
                    child = this.mutate(child);
                }
                children.push(child);
            }

            population = [...elites, ...children];

            // Console log progress (for debugging/demo)
            // console.log(`Generation ${gen}: Best Fitness = ${sortedPop[0].fitness}`);

            // Optional: Yield control to UI if running in main thread
            await new Promise(r => setTimeout(r, 0));
        }

        // Return best lineup of final generation
        const finalFitness = await this.evaluatePopulation(population, simulationsPerLineup);
        const bestIndex = finalFitness.indexOf(Math.max(...finalFitness));
        return population[bestIndex];
    }

    generateInitialPopulation(size) {
        const pop = [];
        // Keep original as one candidate
        pop.push(this.baseLineup.clone());

        for (let i = 1; i < size; i++) {
            const shuffled = this.baseLineup.clone();
            this.shuffleLineup(shuffled);
            pop.push(shuffled);
        }
        return pop;
    }

    shuffleLineup(lineup) {
        // Fisher-Yates shuffle
        for (let i = lineup.players.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            lineup.swap(i, j);
        }
    }

    /**
     * Evaluate entire population
     */
    async evaluatePopulation(population, simsPerLineup) {
        return Promise.all(population.map(lineup => this.evaluateFitness(lineup, simsPerLineup)));
    }

    /**
     * Fitness Function: Expected Runs
     */
    evaluateFitness(lineup, simulations = 10) {
        // Allow mocking for tests
        if (this.simulatorRunner) {
            return this.simulatorRunner(lineup);
        }

        const simulator = new GameSimulator(lineup);
        let totalRuns = 0;

        for (let i = 0; i < simulations; i++) {
            const result = simulator.simulateGame();
            totalRuns += result.score;
        }

        return totalRuns / simulations; // Expected Runs
    }

    /**
     * Order Crossover (PMX or simple swap-based)
     * For permutations, standard point crossover creates duplicates.
     * Simple approach: Take parent1, swap two random positions to mimic mixing? 
     * Better approach (Cycle Crossover): 
     *  - Inherit positions from P1, fill rest from P2 order.
     */
    crossover(parent1, parent2) {
        // For simplicity in MVP:
        // Child is clone of Parent1 with a subsequence from Parent2 applied? 
        // Or just Order Crossover (OX1).

        // Simplified Logic: 
        // Take first 5 from P1. Fill remaining 4 from P2 (in the order they appear in P2).
        const cut = 5;
        const childPlayers = [];
        const p1Set = new Set();

        // Take head from P1
        for (let i = 0; i < cut; i++) {
            childPlayers.push(parent1.players[i]);
            p1Set.add(parent1.players[i].id);
        }

        // Fill from P2
        for (const p of parent2.players) {
            if (!p1Set.has(p.id)) {
                childPlayers.push(p);
            }
        }

        return new Lineup(childPlayers);
    }

    mutate(lineup) {
        const mutated = lineup.clone();
        // Swap two random players
        const idx1 = Math.floor(Math.random() * 9);
        const idx2 = Math.floor(Math.random() * 9);
        mutated.swap(idx1, idx2);
        return mutated;
    }
}
