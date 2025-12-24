// Helper to aggregate stats
export default class StatsAggregator {
    static aggregate(results) {
        if (!results || results.length === 0) return { expectedRuns: 0, winRate: 0 };

        const totalRuns = results.reduce((sum, r) => sum + r.score, 0);
        const winCount = results.filter(r => r.isWin).length;

        return {
            expectedRuns: totalRuns / results.length,
            winRate: (winCount / results.length) * 100
        };
    }
}
