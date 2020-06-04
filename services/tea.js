module.exports = {
    getInfusionTime(teaColor) {
        switch (teaColor) {
            case 'vert':
                return '2 à 3 minutes';
            case 'noir':
                return '4 à 5 minutes';
            case 'blanc':
                return '5 minutes';
            case 'infusion':
                return '5 à 8 minutes';
            default:
                return '4 minutes';
        }
    }
};
