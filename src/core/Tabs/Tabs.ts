import { ITab, IViewSize } from "@/interfaces";
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

  public async go(tab: ITab) {
    logger("loadUrl:", tab);
    const { id, url } = tab;
    const { view } = this.views[id];

    view.webContents.loadURL(url);

    // view.setBounds(this.bowserWindow.getBounds());
    view.setBounds({ x: 200, y: 200, width: 400, height: 400 });

    this.browserWindow.contentView.addChildView(view);
  }

  public async create() {
    const id = Object.keys(this.views).length + 1;
    const view: IView = {
      id: id,
      url: "",
      view: new WebContentsView(),
    };
    logger("view:", view);
    this.views[id] = view;
    return id;
  }

  public async close(id: number) {
    const { view } = this.views[id];
    if (view) {
      const parentWindow = BrowserWindow.fromWebContents(view.webContents);
      if (parentWindow) {
        parentWindow.contentView.removeChildView(view);
        delete this.views[id];
        return id;
      }
    }
    return null;
  }

  public async setBounds(viewSize: IViewSize) {
    const { topOffset, width, height } = viewSize;
    Object.keys(this.views).forEach((key) => {
      const id = Number(key);
      this.views[id].view.setBounds({
        x: 0,
        y: topOffset,
        width: width,
        height: height,
      });
    });
  }
}

export default Views;
