import {Component, ApplicationRef} from '@angular/core';
declare var $: any;

import { 
         OnInit, 
         ViewChild, 
         ComponentFactoryResolver,
         ViewContainerRef } from '@angular/core';
         
         import { ExpComponent } from '../exp-component/exp-component.component';
import { AuthService } from '../auth.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  _userID: string;
  loadingImg :any = document.createElement("img");
  topLeft: any= {
    "left": "5",
    "top": "5"
  };
  
    @ViewChild('parent', { read: ViewContainerRef })
     container: ViewContainerRef;
  
     color : string;
  
     constructor(private _cfr: ComponentFactoryResolver ,
     public auth :AuthService , 
     private afs: AngularFirestore,
     ) { 

          this.auth.user
          .subscribe(user => {
             if (user) {
               this._userID = user.uid;
               const collection: AngularFirestoreCollection<any> = this.afs.collection(`users/${this._userID}/userData/`);
               console.log("user is :"+ this._userID);
             /*  const collection$: Observable<any> = collection.valueChanges();
              
               
               
                           collection$.subscribe(data => {
                             console.log("how ar e you :" + data);
                             
                           });*/
                           //this.afs.collection("userData").get()
                           collection.ref.get()
                           .then( (querySnapshot)=> {
                            this.loadingImg.style.display = "none";
                             //var ids:any[];
                            querySnapshot.forEach((doc)=> {
                             
                               this.addComponent(doc.id);
                            });
                       

                        });
                          
              }
          });


         }
              



     ngOnInit(){ }
  
    /* setColor(event){
     // console.log("click event occur");
    //  console.log(this.color);
      
     }*/
     mouseUp(event){
      this.color = event.target.style.backgroundColor;
      this.topLeft = {
        left: event.target.getBoundingClientRect().left + window.scrollX,
        top: event.target.getBoundingClientRect().top + window.scrollX,
      }
      this.addComponent(null) ; 
      
  
    //   console.log("mouse up up up ");
      }
     ngAfterViewInit() {


      this.loadingImg.src = "../assets/Ripple.svg";
    this.loadingImg.style.width = "250px";
    this.loadingImg.style.height = "250px";
    this.loadingImg.style.position =  "fixed";
    this.loadingImg.style.top = "30%";
    this.loadingImg.style.left = "30%";

  //  this.loadingImg.style.marginTop = "-25px";
    this.loadingImg.style.zIndex = 1000;
    document.getElementById('pag').appendChild(this.loadingImg);
       $(".sticker").draggable({
         start: (event, ui) => {
         //var StickyColor = $(this.).css("background-color");
         // console.log("hi from members mmmmmmmmmmmmmmm"+ this.StickyColor);
      //   this.addComponent() ;
         // this.createSticky(this.StickyColor) ;
         },
         revert: true,
         opacity: 0.7,
         revertDuration: 330,
         //    stack: ".head",
         distance: 0,
         // appentTo :
       });

       
       
      }

      
  
    addComponent(stickyID){    
        var comp = this._cfr.resolveComponentFactory(ExpComponent);
        var expComponent = this.container.createComponent(comp);
      //  this.appRef.attachView(expComponent.hostView);
        expComponent.instance._ref = expComponent;
        expComponent.instance._StickyColorr = this.color;
        expComponent.instance._topLeft = this.topLeft;
        expComponent.instance._container = this.container;
        expComponent.instance._stickyID = stickyID;
        
  
    }
  
    /* getOffset(el) {
      el = el.getBoundingClientRect();
      return {
          left: el.left + window.scrollX,
          top: el.top + window.scrollY
        }*/
  }
  