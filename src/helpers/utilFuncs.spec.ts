import { dateFieldValuesToDateString } from './utilFuncs';

describe('utilFuncs', () => {
  describe('dateFieldValuesToDateString', () => {
    it('returns a blank string for blank field values', () => {
      const dateString = dateFieldValuesToDateString({ dd: '', mm: '', yyyy: '' });

      expect(dateString).toBe('');
    });

    it('returns INVALID DATE if any fields are incomplete', () => {
      const dateString = dateFieldValuesToDateString({ dd: '02', mm: '12', yyyy: '198' });

      expect(dateString).toBe('INVALID DATE');
    });

    it('returns INVALID DATE if the date is invalid', () => {
      const dateString = dateFieldValuesToDateString({ dd: '02', mm: '72', yyyy: '1980' });

      expect(dateString).toBe('INVALID DATE');
    });

    it('returns an ISO date string', () => {
      const dateString = dateFieldValuesToDateString({ dd: '02', mm: '12', yyyy: '1980' });

      expect(dateString).toBe('1980-12-02T00:00:00.000Z');
    });
  });
});
