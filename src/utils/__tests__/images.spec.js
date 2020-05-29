import { avatarUrlByUsername, getGifByTag } from '../images';

describe('Images Utils Spec', () => {
  describe('avatarUrlByUsername Spec', () => {
    it('Should return avatar api with username info', () => {
      const result = avatarUrlByUsername('Foo Bar');

      expect(/name=Foo\+Bar/gi.test(result)).toBeTruthy();
    });
  });

  describe('getGifByTag Spec', () => {
    it('Should return the date formattd in h:mm pm', async () => {
      global.fetch = jest.fn().mockImplementation(() => ({
        json: () => ({
          data: {
            image_url: 'www.google.com',
            title: 'Google',
          },
        }),
      }));
      const result = await getGifByTag('Foo');

      expect(result).toMatchObject({
        url: 'www.google.com',
        alt: 'Google',
      });
    });
  });
});
