const teaService = require('../../services/tea.js');

describe('getInfusionTime', () => {
    test('get infusion time of each tea', () => {
        expect(teaService.getInfusionTime('vert')).toBe('2 à 3 minutes');
        expect(teaService.getInfusionTime('noir')).toBe('4 à 5 minutes');
        expect(teaService.getInfusionTime('blanc')).toBe('5 minutes');
        expect(teaService.getInfusionTime('infusion')).toBe('5 à 8 minutes');
    });
    test('get infusion time of random tea', () => {
        expect(teaService.getInfusionTime('random')).toBe('4 minutes');
    });
});
