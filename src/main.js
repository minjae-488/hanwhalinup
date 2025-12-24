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
    const players = rosterData.map(p => new Player(p.id, p.name, p.position, p.hand, p.stats, p.category)); // Ensure category is passed
    // Valid Lineup must be exactly 9 players. We take the first 9 from the roster as default.
    const currentLineup = new Lineup(players.slice(0, 9));

    // 2. Setup UI
    // 2. Setup UI
    const ui = new UIManager();

    // Bind UI callbacks
    ui.onLineupReorder = (fromIndex, toIndex) => {
        // Swap players in current lineup
        const p1 = currentLineup.players[fromIndex];
        const p2 = currentLineup.players[toIndex];
        currentLineup.players[fromIndex] = p2;
        currentLineup.players[toIndex] = p1;

        // Re-render
        ui.renderLineup(currentLineup, 'current');
    };

    ui.onPlayerReplace = (index, newPlayerId) => {
        const newPlayerConfig = rosterData.find(p => p.id === newPlayerId);
        if (newPlayerConfig) {
            const newPlayer = new Player(newPlayerConfig.id, newPlayerConfig.name, newPlayerConfig.position, newPlayerConfig.hand, newPlayerConfig.stats, newPlayerConfig.category);

            // Check if player is already in lineup
            const existingIndex = currentLineup.players.findIndex(p => p && p.id === newPlayer.id);

            if (existingIndex !== -1) {
                // Swap
                const temp = currentLineup.players[index];
                currentLineup.players[index] = currentLineup.players[existingIndex];
                currentLineup.players[existingIndex] = temp;
            } else {
                // Insert
                currentLineup.players[index] = newPlayer;
            }

            ui.renderLineup(currentLineup, 'current');
        }
    };

    ui.onPlayerRemove = (index) => {
        currentLineup.players[index] = null; // Mark as empty
        ui.renderLineup(currentLineup, 'current');
    };

    ui.renderRosterPool(rosterData);
    ui.renderLineup(currentLineup, 'current'); // Will render initial view

    // 3. Event Binding
    // 3. Event Binding
    // Helper to bind multiple buttons
    const bindClick = (ids, handler) => {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', handler);
        });
    };

    // RERUN Handler
    const handleRerun = async () => {
        ui.setLoading(true);
        // Disable buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(b => b.disabled = true);

        // Run Optimization (Genetic Algorithm)
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
                const simCurrent = await optimizer.evaluateFitness(currentLineup, 200);
                const simOptimized = await optimizer.evaluateFitness(optimizedLineup, 200);

                // Update UI
                ui.renderResults({
                    currentRun: simCurrent,
                    optimizedRun: simOptimized,
                    winRate: 60.5
                });
                ui.renderLineup(optimizedLineup, 'optimized');

            } catch (e) {
                console.error(e);
                alert('Optimization failed execution.');
            } finally {
                ui.setLoading(false);
                buttons.forEach(b => b.disabled = false);
            }
        }, 100);
    };

    bindClick(['btn-rerun', 'btn-rerun-mobile'], handleRerun);
    bindClick(['btn-apply', 'btn-apply-mobile'], () => alert('Lineup applied! (Mock)'));

    const btnLiveSim = document.getElementById('btn-live-sim');

    // State
    let optimizedLineup = null;

    // LIVE SIMULATION Action
    if (btnLiveSim) {
        btnLiveSim.addEventListener('click', async () => {
            const btnOriginalText = btnLiveSim.innerHTML;
            btnLiveSim.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> 시뮬레이션 중...';
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


    // Toggle Lineup View Logic (Simple visual toggle)
    // For MVP, we switch the list content when user clicks "Optimized Lineup" tab in UI
    // But since tabs are static HTML currently, we attach logic if needed.
    // ...
});
