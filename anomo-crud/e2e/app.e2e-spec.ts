import { AnomoCrudPage } from './app.po';

describe('anomo-crud App', () => {
  let page: AnomoCrudPage;

  beforeEach(() => {
    page = new AnomoCrudPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
