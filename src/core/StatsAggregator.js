export default class StatsAggregator {
    constructor() {
        this.results = [];
    }

    addGameResult(result) {
        this.results.push(result);
    }

    getAggregateStats() {
        if (this.results.length === 0) return { avgRuns: 0, winRate: 0 };

        const totalRuns = this.results.reduce((sum, r) => sum + r.score, 0);
        const winCount = this.results.filter(r => r.isWin).length;

        return {
            avgRuns: totalRuns / this.results.length,
            winRate: winCount / this.results.length
        };
    }
}
