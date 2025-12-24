import LiveSubSimulator from './core/LiveSubSimulator.js';
import Player from './core/Player.js';
import Lineup from './core/Lineup.js';
import Optimizer from './core/Optimizer.js';
import StatsAggregator from './core/StatsAggregator.js';
import UIManager from './ui/UIManager.js';
import rosterData from './data/roster.js';

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Hanwha Eagles Optimizer initializing...');

    // 1. Data Ingestion
    const players = rosterData.map(p => new Player(p.id, p.name, p.position, p.hand, p.stats));
    const currentLineup = new Lineup(players);

    // 2. Setup UI
    const ui = new UIManager();
    ui.renderLineup(currentLineup, 'current'); // Will render initial view

    // 3. Event Binding
    const btnRerun = document.getElementById('btn-rerun');
    const btnLiveSim = document.getElementById('btn-live-sim');

    // State
    let optimizedLineup = null;

    // LIVE SIMULATION Action
    if (btnLiveSim) {
        btnLiveSim.addEventListener('click', async () => {
            const btnOriginalText = btnLiveSim.innerHTML;
            btnLiveSim.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Simulating...';
            btnLiveSim.disabled = true;

            setTimeout(() => {
                const inning = parseInt(document.getElementById('live-inning').value);
                const outs = parseInt(document.getElementById('live-outs').value);
                const b1 = document.getElementById('live-base-1').checked ? 1 : 0;
                const b2 = document.getElementById('live-base-2').checked ? 1 : 0;
                const b3 = document.getElementById('live-base-3').checked ? 1 : 0;

                const context = {
                    inning: inning,
                    outs: outs,
                    bases: [b1, b2, b3],
                    scoreDiff: 0
                };

                // Use optimized lineup if available, else current
                const targetLineup = optimizedLineup || currentLineup;
                const liveSim = new LiveSubSimulator(targetLineup);

                // Calculate Expected Runs
                const expRuns = liveSim.calculateExpectedRuns(context, 500);

                // UI Update
                const resultBox = document.getElementById('live-result');
                const resultText = resultBox.querySelector('.result-text');

                resultBox.classList.remove('hidden');
                resultText.innerHTML = `${expRuns.toFixed(2)} <span class="text-sm font-normal text-gray-400">Exp. Runs</span>`;

                btnLiveSim.innerHTML = btnOriginalText;
                btnLiveSim.disabled = false;
            }, 50);
        });
    }

    // RERUN / OPTIMIZE Action
    btnRerun.addEventListener('click', async () => {
        ui.setLoading(true);
        btnRerun.disabled = true;

        // Run Optimization (Genetic Algorithm)
        // Use timeout to allow UI to update loading state (Simulate Async Worker)
        setTimeout(async () => {
            try {
                const optimizer = new Optimizer(currentLineup);
                console.time('Optimization');

                // Config for speed demo
                optimizedLineup = await optimizer.optimize({
                    generations: 20,
                    populationSize: 50,
                    simulationsPerLineup: 50
                });

                console.timeEnd('Optimization');

                // Evaluate Result
                // Compare Current vs Optimized
                const simCurrent = await optimizer.evaluateFitness(currentLineup, 200);
                const simOptimized = await optimizer.evaluateFitness(optimizedLineup, 200);

                // Update UI
                ui.renderResults({
                    currentRun: simCurrent,
                    optimizedRun: simOptimized,
                    winRate: 60.5 // TODO: Calculate actual winrate against league avg
                });
                ui.renderLineup(optimizedLineup, 'optimized');

            } catch (e) {
                console.error(e);
                alert('Optimization failed execution.');
            } finally {
                ui.setLoading(false);
                btnRerun.disabled = false;
            }
        }, 100);
    });

    // Toggle Lineup View Logic (Simple visual toggle)
    // For MVP, we switch the list content when user clicks "Optimized Lineup" tab in UI
    // But since tabs are static HTML currently, we attach logic if needed.
    // ...
});
