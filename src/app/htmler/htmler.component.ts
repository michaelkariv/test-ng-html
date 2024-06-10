import {ApplicationRef, Component, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-htmler',
  standalone: true,
  imports: [],
  templateUrl: './htmler.component.html'
})
export class HtmlerComponent {
  public htmlContents: string = "Nothing. Click Render button";
  public data = {data: ['item1', 'item2']}
  @ViewChild('renderTpl', {read: TemplateRef}) _renderTpl: TemplateRef<any> | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private helperContainer: ViewContainerRef,
    private appRef: ApplicationRef // this is needed for generating html of the printed meals list
  ) {
  }


  renderHtmlUsingAppRef() {
    this.helperContainer.clear();
    const div = document.createElement('div');
    const view = this._renderTpl!.createEmbeddedView(this.data);
    this.appRef.attachView(view);
    view.rootNodes.forEach(node => div.appendChild(node));
    const htmlString = div.innerHTML;
    this.appRef.detachView(view);
    view.destroy();
    this.htmlContents = htmlString;
    console.log(this.htmlContents);
  }


  renderHtmlUsingContainer() {
    this.helperContainer.clear();
    const view = this.helperContainer.createEmbeddedView(this._renderTpl!, this.data);
    this.helperContainer.insert(view);
    const lines: string[] = [];
    for (let i = 0; i < this.helperContainer.length; i++) {
      const viewRef = this.helperContainer.get(i);
      const rootNodes = (viewRef as any).rootNodes; // Accessing the root nodes of the embedded view
      rootNodes.forEach((node: any) => {
        if (node instanceof HTMLElement) {
          lines.push(node.innerHTML);
        } else {
          console.error('node is not an HTMLElement');
        }
      });
    }
    this.htmlContents = lines.join('\n');
    console.log(this.htmlContents);
  }
}
