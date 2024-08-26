import { ITab } from "@/interfaces";
import { WebContentsView, BrowserWindow } from "electron";
import debug from "debug";

const logger = debug("core:Views");

interface IView extends ITab {
  view: WebContentsView;
}

/**
 * TODO: think about rename to Tabs
 */

class Views {
  private views: Record<number, IView>;
  private browserWindow: BrowserWindow;

  constructor() {
    this.views = {};
  }

  public setBrowserWindow(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }

  public async loadUrl(tab: ITab) {
    logger(tab);
    const { url } = tab;
    const view = new WebContentsView();

    view.webContents.loadURL(url);

    // view.setBounds(this.bowserWindow.getBounds());
    view.setBounds({ x: 200, y: 200, width: 400, height: 400 });

    this.browserWindow.contentView.addChildView(view);
  }
}

export default Views;

/**
 * TODO: Events for maintain Tabs & Views
 */
