import BaseSystem from '../src/core/BaseSystem.js';

describe('BaseSystem Class', () => {
    let system;

    beforeEach(() => {
        system = new BaseSystem();
    });

    test('should initialize with empty bases', () => {
        expect(system.getBases()).toEqual([0, 0, 0]); // [1st, 2nd, 3rd] - 0: empty, 1: occupied
        expect(system.score).toBe(0);
    });

    test('should reset bases properly', () => {
        system.advanceRunners('single');
        system.reset();
        expect(system.getBases()).toEqual([0, 0, 0]);
        expect(system.score).toBe(0);
    });

    // Basic scenarios based on standard baseball rules (can be enhanced with probability later)
    test('Solo Home Run: Bases empty -> 1 Run', () => {
        const runs = system.advanceRunners('homerun');
        expect(runs).toBe(1);
        expect(system.score).toBe(1);
        expect(system.getBases()).toEqual([0, 0, 0]);
    });

    test('Single with no runners: Runner on 1st', () => {
        const runs = system.advanceRunners('single');
        expect(runs).toBe(0);
        expect(system.getBases()).toEqual([1, 0, 0]);
    });

    test('Two consecutive singles: Runners on 1st and 2nd', () => {
        system.advanceRunners('single');
        const runs = system.advanceRunners('single');
        expect(runs).toBe(0);
        expect(system.getBases()).toEqual([1, 1, 0]); // Typically runner on 1st goes to 2nd
    });

    test('Grand Slam: Bases loaded -> 4 Runs', () => {
        // Load bases
        system.forceLoadBases([1, 1, 1]);
        const runs = system.advanceRunners('homerun');
        expect(runs).toBe(4);
        expect(system.getBases()).toEqual([0, 0, 0]);
    });

    test('Walk with runner on 1st: Runners on 1st and 2nd', () => {
        system.forceLoadBases([1, 0, 0]); // Runner on 1st
        const runs = system.advanceRunners('walk');
        expect(runs).toBe(0);
        expect(system.getBases()).toEqual([1, 1, 0]);
    });

    test('Walk with bases loaded: 1 Run, bases still loaded', () => {
        system.forceLoadBases([1, 1, 1]);
        const runs = system.advanceRunners('walk');
        expect(runs).toBe(1);
        expect(system.getBases()).toEqual([1, 1, 1]);
    });

    // Advanced Scenario: Double with runner on 1st
    // Standard rule: Runner on 1st usually scores or goes to 3rd on a double. 
    // Let's assume standard advancement for MVP: Runner scores.
    test('Double with runner on 1st: Runner scores, Batter on 2nd', () => {
        system.forceLoadBases([1, 0, 0]);
        const runs = system.advanceRunners('double');
        expect(runs).toBe(1); // Runner on 1st scores
        expect(system.getBases()).toEqual([0, 1, 0]); // Batter on 2nd
    });
});
