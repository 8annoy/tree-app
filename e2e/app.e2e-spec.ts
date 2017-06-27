import { TreeAppPage } from './app.po';

describe('tree-app App', () => {
  let page: TreeAppPage;

  beforeEach(() => {
    page = new TreeAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
