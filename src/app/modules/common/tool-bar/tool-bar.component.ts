import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, HostListener, OnInit, Renderer2, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { faEllipsisV, faHome } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/authentication/user.service';
import { ToolbarAdditionService } from 'src/app/services/DataShareServices/toolbar-addition.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

  @ViewChild("extraMenuOptionsTarget", {read: ViewContainerRef})
  extraMenuOptionsTarget!: ViewContainerRef;

  toolbarComponents: ComponentRef<Component>[] = new Array<ComponentRef<Component>>();
  routerEventSubscription!: Subscription;

  faHome = faHome;
  faEllipsisV = faEllipsisV;

  dropdownIsActive:boolean = false;
  toolbarTitle: string = "";
  titleSubscription!: Subscription;
  toolbarTitleSize: string = "short";

  constructor(
    private _router: Router,
    private _titleService: ToolbarAdditionService,
    private componentFactoryResolver: ComponentFactoryResolver
    ) { 

    }

  ngOnInit(): void {
    this.titleSubscription = this._titleService.currentTitleMessage.subscribe(message => {
      if(message.length < 11) this.toolbarTitleSize = "short"
      if(message.length < 21 && message.length > 10) this.toolbarTitleSize = "long"
      if(message.length > 20) this.toolbarTitleSize = "longer"
      this.toolbarTitle = message
    });
    this.routerEventSubscription = this._router.events.subscribe(
      (event: any) => {
          if (event instanceof NavigationEnd) {
              this.dropdownIsActive = false;
              this.toolbarTitle = "";
              this.updateToolbarContent(this._router.routerState.snapshot.root);
          }
      }
    );

  }

  private updateToolbarContent(snapshot: ActivatedRouteSnapshot): void {
    this.clearToolbar();
    let toolbar: any = (snapshot.data as {toolbar: Type<Component>}).toolbar;
    if (toolbar instanceof Type) {
        let factory: ComponentFactory<Component> = this.componentFactoryResolver.resolveComponentFactory(toolbar);
        let componentRef: ComponentRef<Component> = this.extraMenuOptionsTarget.createComponent(factory);
        this.toolbarComponents.push(componentRef);
    }
    for (let childSnapshot of snapshot.children) {
        this.updateToolbarContent(childSnapshot);
    }
  }

  private clearToolbar() {
      this.extraMenuOptionsTarget.clear();
      for (let toolbarComponent of this.toolbarComponents) {
          toolbarComponent.destroy();
      }
  }

  home(){
    this._router.navigate(['/']);
  }

  settings(){
    this.dropdownIsActive = !this.dropdownIsActive;
  }

  removeSetting(){
    this.dropdownIsActive = false;
  }

  profile(){
    this._router.navigate(['/profile']);
  }
  
  groupOverview(){
    this._router.navigate([`/group/overview`]);
  }
}