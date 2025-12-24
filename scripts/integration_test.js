import Player from '../src/core/Player.js';
import Lineup from '../src/core/Lineup.js';
import GameSimulator from '../src/core/GameSimulator.js';
import Optimizer from '../src/core/Optimizer.js';
import LiveSubSimulator from '../src/core/LiveSubSimulator.js';
import rosterData from '../src/data/roster.js';

async function runIntegrationTest() {
    console.log('⚾ Starting Integration Sanity Check...\n');

    // 1. Data Loading Test
    console.log('[Test 1] Loading Roster Data...');
    if (!rosterData || rosterData.length === 0) {
        throw new Error('FAILED: Roster data is empty or missing.');
    }
    console.log(`✅ Loaded ${rosterData.length} players.\n`);

    // 2. Lineup Creation Test
    console.log('[Test 2] Creating Lineup...');
    const players = rosterData.map(p => new Player(p.id, p.name, p.position, p.hand, p.stats));
    const lineup = new Lineup(players);
    if (!lineup.validate()) {
        throw new Error('FAILED: Lineup validation failed.');
    }
    console.log('✅ Lineup created successfully.\n');

    // 3. Single Game Simulation Test
    console.log('[Test 3] Running Single Game Simulation...');
    const simulator = new GameSimulator(lineup);
    const result = simulator.simulateGame();
    console.log(`   Box Score: ${result.score} Runs in ${result.innings} Innings`);
    if (result.innings < 9) {
        throw new Error('FAILED: Game finished before 9 innings.');
    }
    console.log('✅ Single Simulation OK.\n');

    // 4. Optimizer (Genetic Algorithm) Test
    console.log('[Test 4] Running Genetic Optimization (Small Scale)...');
    console.time('Optimization Time');
    const optimizer = new Optimizer(lineup);
    const optimizedLineup = await optimizer.optimize({
        generations: 5,
        populationSize: 10,
        simulationsPerLineup: 10
    });
    console.timeEnd('Optimization Time');

    if (!optimizedLineup || optimizedLineup.players.length !== 9) {
        throw new Error('FAILED: Optimization returned invalid lineup.');
    }

    // Compare Expected Runs
    const currentFitness = await optimizer.evaluateFitness(lineup, 50);
    const optimizedFitness = await optimizer.evaluateFitness(optimizedLineup, 50);
    console.log(`   Current Avg Runs: ${currentFitness.toFixed(2)}`);
    console.log(`   Optimized Avg Runs: ${optimizedFitness.toFixed(2)}`);
    // Note: Due to randomness and small sample, optimized isn't GUARANTEED to be higher in this micro-test, 
    // but code execution path is verified.
    console.log('✅ Optimizer Logic OK.\n');

    // 5. Live Sub Simulator Test
    console.log('[Test 5] Running Live Sub Simulator...');
    const liveContext = {
        inning: 9,
        outs: 2,
        bases: [1, 1, 1], // Bases Loaded
        scoreDiff: -1
    };
    const liveSim = new LiveSubSimulator(lineup);
    const expRuns = liveSim.calculateExpectedRuns(liveContext, 100);
    console.log(`   Scenario: 9th Inn, 2 Out, Bases Loaded`);
    console.log(`   Expected Runs Added: ${expRuns.toFixed(2)}`);

    if (expRuns < 0) { // Can't be negative runs added
        throw new Error('FAILED: Live Sim returned negative runs.');
    }
    console.log('✅ Live Sub Simulator OK.\n');

    console.log('🎉 ALL SYSTEMS GO! The engine is ready for deployment.');
}

runIntegrationTest().catch(err => {
    console.error('❌ SIMULATION FAILED:', err);
    process.exit(1);
});
