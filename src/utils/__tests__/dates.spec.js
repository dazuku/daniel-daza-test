import { getFormattedHour } from '../dates';

describe('Dates Utils Spec', () => {
  describe('getFormattedHour Spec', () => {
    it('Should return the date formattd in h:mm pm', () => {
      const result = getFormattedHour(new Date(0));

      expect(result).toBe('7:00 pm');
    });

    it('Should return the date formattd in h:mm am', () => {
      const result = getFormattedHour(new Date(100000000000000));

      expect(result).toBe('4:46 am');
    });
  });
});
