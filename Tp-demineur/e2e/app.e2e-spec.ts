import { TpDemineurPage } from './app.po';

describe('tp-demineur App', function() {
  let page: TpDemineurPage;

  beforeEach(() => {
    page = new TpDemineurPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
