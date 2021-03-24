import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/Odbrojavanje');
    });
    it('should say Odbrojavanje', () => {
      expect(page.getParagraphText()).toContain('Odbrojavanje');
    });
  });
});
