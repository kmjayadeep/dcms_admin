import { DrishtiAdminPage } from './app.po';

describe('drishti-admin App', function() {
  let page: DrishtiAdminPage;

  beforeEach(() => {
    page = new DrishtiAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
