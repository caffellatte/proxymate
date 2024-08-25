import { ITab } from "@/interfaces";
import { WebContentsView, BrowserWindow } from "electron";

interface IView extends ITab {
  view: WebContentsView;
}

/**
 * TODO: think about rename to Tabs
 */

class Views {
  private views: Record<number, IView>;
  private browserWindow: BrowserWindow;

  constructor(browserWindow: BrowserWindow) {
    this.browserWindow = browserWindow;
  }
}

export default Views;

/**
 * TODO: Events for maintain Tabs & Views
 */
