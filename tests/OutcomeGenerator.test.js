import OutcomeGenerator from '../src/core/OutcomeGenerator.js';

describe('OutcomeGenerator Class', () => {
    // Mock random function to control test results
    const mockRandom = (val) => {
        global.Math.random = () => val;
    };

    // Restore random
    const originalRandom = global.Math.random;
    afterAll(() => {
        global.Math.random = originalRandom;
    });

    const playerStats = {
        probability: {
            single: 0.1,    // 0.0 - 0.1
            double: 0.05,   // 0.1 - 0.15
            triple: 0.00,   // 0.15 - 0.15
            homerun: 0.05,  // 0.15 - 0.20
            walk: 0.1,      // 0.20 - 0.30
            strikeout: 0.2, // 0.30 - 0.50
            groundout: 0.2, // 0.50 - 0.70
            flyout: 0.3     // 0.70 - 1.00
            // Sum = 1.0
        }
    };

    test('should return HIT based on probability', () => {
        const generator = new OutcomeGenerator();

        mockRandom(0.05); // Falls in single (0.0 - 0.1)
        expect(generator.generateOutcome(playerStats)).toBe('single');

        mockRandom(0.12); // Falls in double (0.1 - 0.15)
        expect(generator.generateOutcome(playerStats)).toBe('double');

        mockRandom(0.18); // Falls in homerun (0.15 - 0.20)
        expect(generator.generateOutcome(playerStats)).toBe('homerun');
    });

    test('should return WALK', () => {
        const generator = new OutcomeGenerator();
        mockRandom(0.25); // Falls in walk (0.20 - 0.30)
        expect(generator.generateOutcome(playerStats)).toBe('walk');
    });

    test('should return OUT types', () => {
        const generator = new OutcomeGenerator();

        mockRandom(0.40); // Strikeout
        expect(generator.generateOutcome(playerStats)).toBe('strikeout');

        mockRandom(0.80); // Flyout
        expect(generator.generateOutcome(playerStats)).toBe('flyout');
    });
});
