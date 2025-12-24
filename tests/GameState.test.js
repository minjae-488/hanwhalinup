import GameState from '../src/core/GameState.js';

describe('GameState Class', () => {
    let state;

    beforeEach(() => {
        state = new GameState();
    });

    test('should initialize with inning 1, no outs, score 0', () => {
        expect(state.inning).toBe(1);
        expect(state.outs).toBe(0);
        expect(state.score).toBe(0);
        // BaseSystem instance is internal, but we can check checking method
        expect(state.getBases()).toEqual([0, 0, 0]);
    });

    test('should record outs and reset inning', () => {
        state.addOut();
        expect(state.outs).toBe(1);

        state.addOut();
        expect(state.outs).toBe(2);

        // 3rd out -> inning change
        state.addOut();
        expect(state.outs).toBe(0);
        expect(state.inning).toBe(2);

        // Bases should be cleared on inning change
        state.baseSystem.forceLoadBases([1, 1, 1]); // manually load to test clear
        state.addOut(); // 1st out of 2nd inning
        state.addOut();
        state.addOut(); // End of 2nd inning

        expect(state.getBases()).toEqual([0, 0, 0]);
        expect(state.inning).toBe(3);
    });

    test('should track score updates', () => {
        state.addScore(2);
        expect(state.score).toBe(2);
        state.addScore(3);
        expect(state.score).toBe(5);
    });

    test('isGameOver should return true after 9 innings', () => {
        // Fast forward to end of 9th
        state.inning = 9;
        state.outs = 2;

        expect(state.isGameOver()).toBe(false);

        state.addOut(); // 3rd out of 9th

        // Typically inning becomes 10 after 9th ends
        expect(state.inning).toBe(10);
        expect(state.isGameOver()).toBe(true);
    });
});
