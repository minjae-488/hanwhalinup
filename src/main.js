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
    const players = rosterData.map(p => new Player(p.id, p.name, p.position, p.hand, p.stats, p.category));

    // Load saved lineup from localStorage or create empty lineup
    const loadLineup = () => {
        try {
            const saved = localStorage.getItem('hanwha-lineup');
            if (saved) {
                const savedIds = JSON.parse(saved);
                const loadedPlayers = savedIds.map(id => {
                    if (id === null) return null;
                    const config = rosterData.find(p => p.id === id);
                    return config ? new Player(config.id, config.name, config.position, config.hand, config.stats, config.category) : null;
                });
                return new Lineup(loadedPlayers);
            }
        } catch (e) {
            console.error('Failed to load lineup:', e);
        }
        // Return empty lineup (all null)
        return new Lineup(Array(9).fill(null));
    };

    const saveLineup = (lineup) => {
        try {
            const ids = lineup.players.map(p => p ? p.id : null);
            localStorage.setItem('hanwha-lineup', JSON.stringify(ids));
        } catch (e) {
            console.error('Failed to save lineup:', e);
        }
    };

    const currentLineup = loadLineup();

    // 2. Setup UI
    const ui = new UIManager();

    // Bind UI callbacks
    const refreshUI = (flashIndex = -1) => {
        const usedIds = currentLineup.players.filter(p => p).map(p => p.id);
        ui.renderRosterPool(rosterData, usedIds);
        ui.renderLineup(currentLineup, 'current', flashIndex);
        saveLineup(currentLineup); // Save after every change
    };

    // Bind UI callbacks
    ui.onLineupReorder = (fromIndex, toIndex) => {
        // Swap players in current lineup
        const p1 = currentLineup.players[fromIndex];
        const p2 = currentLineup.players[toIndex];
        currentLineup.players[fromIndex] = p2;
        currentLineup.players[toIndex] = p1;

        // Re-render
        refreshUI(toIndex); // Flash the "Target" of drag
    };

    ui.onPlayerReplace = (index, newPlayerId) => {
        // Ensure ID types match (roster usually has strings or numbers, let's normalize check)
        const newPlayerConfig = rosterData.find(p => String(p.id) === String(newPlayerId));
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

            refreshUI(index); // Pass index to trigger Flash Effect
        }
    };

    ui.onPlayerRemove = (index) => {
        currentLineup.players[index] = null; // Mark as empty
        refreshUI();
    };

    // Reset button handler
    ui.onResetLineup = () => {
        if (confirm('라인업을 초기화하시겠습니까?\n모든 선수가 타순에서 제외됩니다.')) {
            for (let i = 0; i < 9; i++) {
                currentLineup.players[i] = null;
            }
            refreshUI();
        }
    };

    refreshUI();

    // 3. Event Binding
    // 3. Event Binding
    const bindClick = (ids, handler) => {
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('click', handler);
        });
    };

    const handleSimulation = async () => {
        // Validation: Check for 9 players
        const validPlayers = currentLineup.players.filter(p => !!p);
        if (validPlayers.length !== 9) {
            alert(`라인업 오류: 선수가 부족합니다!\n현재 ${validPlayers.length}명 / 9명이 배정되었습니다.\n빈 슬롯을 모두 채워주세요.`);
            return;
        }

        ui.setLoading(true);

        setTimeout(async () => {
            try {
                // Dynamic import to keep main bundle clean
                const GameSimulator = (await import('./core/GameSimulator.js')).default;
                const StatsAggregator = (await import('./core/StatsAggregator.js')).default;

                const SIM_GAMES = 1000;
                // GameSimulator expects lineup in constructor
                const simulator = new GameSimulator(currentLineup);
                const aggregator = new StatsAggregator();

                // Run Simulations
                for (let i = 0; i < SIM_GAMES; i++) {
                    // simulateGame() uses the lineup passed to constructor
                    const result = simulator.simulateGame();
                    aggregator.addGameResult(result);
                }

                const stats = aggregator.getAggregateStats();

                // Render Result
                ui.renderResults({
                    currentRun: stats.avgRuns,
                    winRate: (stats.winRate * 100).toFixed(1)
                });

            } catch (e) {
                console.error("Simulation failed:", e);
                alert('시뮬레이션 중 오류가 발생했습니다.');
            } finally {
                ui.setLoading(false);
            }
        }, 100);
    };

    bindClick(['btn-rerun', 'btn-rerun-mobile'], handleSimulation);

    // Bind Reset Button
    const btnReset = document.getElementById('btn-reset');
    if (btnReset && ui.onResetLineup) {
        btnReset.addEventListener('click', ui.onResetLineup);
    }

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
