import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import * as elementResizeDetectorMaker from '.../../element-resize-detector';

// firebase firestore
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';


//
declare var $: any;

interface Sticky {
  sdata: string;
  top: string;
  left?: string;
  Scolor: string;
  width?: number;
  height?: number;
}
@Component({
  selector: 'app-exp',
  templateUrl: './exp-component.component.html',
  styleUrls: ['./exp-component.component.css']
})
export class ExpComponent {
  LastTypingTime: number;
 lastSizeChange: number;
  TYPING_TIMER_LENGTH:number = 700;
  typing:boolean = false;
  _stickyID: any;
  _ref: any;
  _top: string = "300";
  _StickyColorr: string;
  _topLeft: any ;
  _container: ViewContainerRef;
  pText: string=" ";
  liveText: string = "";
  userid: string;
  _width: number ;
  _height: number ;
   loadingImg :any = document.createElement("img");


   _zindex :number = 10;
  static szindex =10;



  constructor(private _cfr: ComponentFactoryResolver,
    private afs: AngularFirestore,
    private auth: AuthService) {


    
    this.auth.user
      .subscribe(user => {
        if (user) {
          this.userid = user.uid;
          console.log("this.userid " + this.userid);

          // const collection: AngularFirestoreCollection<Sticky> = afs.collection('sticky');



          //if it was created before 
          if (this._stickyID) {       
            const collection: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userid}/userData/${this._stickyID}`);
            //this.liveText = this.afs.collection(`users/${this.userid}/userData/sticky/sdata`).valueChanges;

            const collection$: Observable<Sticky> = collection.valueChanges();



            collection$.subscribe(data => {
              
              if (!this.liveText){       //to bring data from firestore once
                console.log("data isssssss :" + data.sdata);
                this.liveText = data.sdata;}
                this._topLeft = {
                  left: data.left,
                  top: data.top
                }
                this._StickyColorr = data.Scolor;
                this._width = data.width;
                this._height = data.height;
            
               // this._stickyID = data.
            //clode if  }
            });
          }

          // its new sticky
          else {
            const collection: AngularFirestoreCollection<any> = this.afs.collection(`users/${this.userid}/userData`);
           // const collection$: Observable<Sticky> = collection.add
            collection.add  ({
                "sdata": this.pText,
                "top": this._topLeft.top,
                "left": this._topLeft.left,
                "Scolor": this._StickyColorr,
               // "width": this._width,
              //  "height": this._height
              }
              )
              .then( (docRef) =>{
                console.log(" created successfully ! id is :"+docRef.id);
                this._stickyID = docRef.id;
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
            });

          }

        }
      });

  }


  deleteSticky() {
    this._ref.destroy();
    const stickyRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userid}/userData/${this._stickyID}`);
    stickyRef.delete();
    

  }
  save() {
    alert('Saved Successfully!');
  }

  setss(event) {
    //  this.ss = event.target.innerHTML;
  }


  ngOnInit() {
    // console.log("h i from ngonit ");
   // this.increaseZindex(null); 
    // this.liveText = "abcd";
  }

  mouseUp(event) {
    // this.color = event.target.style.backgroundColor;
    console.log("before set ! top:" + this._topLeft.top + " left " + this._topLeft.left);
    console.log("this id is : "+this._stickyID);
    this._topLeft = {
      left: event.target.getBoundingClientRect().left + window.scrollX,
      top: event.target.getBoundingClientRect().top + window.scrollY,
    }

    const stickyRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userid}/userData/${this._stickyID}`);
    stickyRef.update({
      "top": this._topLeft.top,
      "left": this._topLeft.left
    }
    )
      .then(() => {
        console.log("psition updated! top:" + this._topLeft.top + " left " + this._topLeft.left);
      });

  }

  pasteFunction(event){
 //  this.liveText +="b";
   //  event.target.appendchild("br");
   /* var textnode = document.createElement("<br>");  */      // Create a text node
   // event.target.appendtext("textnode");  
  /*   var textnode2 = document.createElement("br");         // Create a text node
    event.target.appendChild(textnode2);  */
   // alert("ppppppppppppppppaset");
   var br = document.createElement("br");
   event.target.appendChild(br);
   var br1 = document.createElement("br");
   event.target.appendChild(br1);

  }

  textChanged(event) {
    this.pText = event.target.innerHTML;
   /*  this.pText += " <br><br>"; */
    /* this.liveText += " <br>"; */
    //var loadingImg = document.createElement("img");
    //this.typing = true;
    this.loadingImg.src = "../assets/Cube.svg";
    this.loadingImg.style.width = "25px";
    this.loadingImg.style.height = "25px";
    this.loadingImg.style.position =  "absolute";
    this.loadingImg.style.marginTop = "-25px";
    this.loadingImg.style.zIndex = 1000;

    if(!this.typing)
    event.target.parentNode.parentNode.append(this.loadingImg);
    this.typing = true;
    this.LastTypingTime = (new Date()).getTime();
    setTimeout( ()=> {
      
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - this.LastTypingTime;
        console.log(typingTimer +"  last typing"+ this.LastTypingTime )
        if (timeDiff >= this.TYPING_TIMER_LENGTH && this.typing) {
            this.LastTypingTime = (new Date()).getTime();
          console.log("hi firday");
            this.loadingImg.remove();
            this.typing = false;
            const stickyRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userid}/userData/${this._stickyID}`);



            stickyRef.update({
              "sdata": this.pText
            }
            )
              .then(function () {
                console.log("Document successfully updated!");
              });

        }
       // 
    }, this.TYPING_TIMER_LENGTH );
    


  }

  get getZindex() {
    return ExpComponent.szindex;
  }

  increaseZindex(event){
 //   console.log("div is ssssssclicked" + event.target.innerHTML);

      ExpComponent.szindex = ExpComponent.szindex +10;
      this._zindex = ExpComponent.szindex;
   // event.target.innerHTML = "hello world ";
  }

  ngAfterViewInit() {
    //  console.log(`style top  :  ${this._topLeft.top}`);
    //  console.log(`style left  :  ${this._topLeft.left}`);
    

    $(".head").draggable({
      start: (event, ui) => {

        //this.sticky = document.createElement("app-sticky-component");


        //     this.stickyCompo  = "<p>aaaaaaaaaaaa</p>";

      },
      opacity: 0.3,
      handle: ".spec",
      stack: ".head",
      distance: 0,
     /*  containment: "#mainTab" */
    });

    let _elementResizeDetector = elementResizeDetectorMaker({
      strategy: 'scroll'
    });

    _elementResizeDetector.listenTo(document.getElementById(this._stickyID),  (element)=> {

        if(!(element.offsetWidth-8 == 192 && element.offsetHeight-8 == 129)){
      this.updateSizechange(element.offsetWidth-8,element.offsetHeight-8);
     // console.log("hi from sunday:" +element.offsetWidth);

        }
    });

  }
  updateSizechange(width,height){
  this.lastSizeChange = (new Date()).getTime();
 // console.log("last typing is : " + this.LastTypingTime);
  
  setTimeout( ()=> {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - this.lastSizeChange;
   
      
      if (timeDiff >= 2000 ) {
        console.log("timeDiff : " + timeDiff);
          this.lastSizeChange = (new Date()).getTime();
          if(this.userid){
          const stickyRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${this.userid}/userData/${this._stickyID}`);
       //   console.log("sticky id  is : " + this._stickyID);
       //   console.log("width : "+width +" height: "+height);
          
          stickyRef.update({
            'width': width,
            'height': height
          }
          )
            .then(function () {
              console.log("size successfully updated! width :"+width);
            });
          
          ///////////////////
         }
        }
  },2000)
}


  addSticky(event) {
    var comp = this._cfr.resolveComponentFactory(ExpComponent);
    var expComponent = this._container.createComponent(comp);
    //  this.appRef.attachView(expComponent.hostView);
    expComponent.instance._ref = expComponent;
    expComponent.instance._StickyColorr = this._StickyColorr;

    var __topLeft = {
      left: event.target.getBoundingClientRect().left + window.scrollX + 35,
      top: event.target.getBoundingClientRect().top + window.scrollX + 35,
    }
    expComponent.instance._topLeft = __topLeft;
    expComponent.instance._zindex = ExpComponent.szindex +10;
    


    expComponent.instance._container = this._container;


  }

  setInputBehavior() {

    $('.paragraphClass').on('input', function () {
      /*  //   alert(this.value);
        console.log("iiiiiiinput:"+ this.id);
       // this.parentNode.append("<img src='Ripple.svg/>'");
    
        // var values = document.getElementById('#parag'+26).id;
        //  var values =  this.getAttribute('data-value');
        var id = this.id;
        var fatherID = this.parentNode.parentNode.parentNode;
    
    /*
       // if ( $("#"+fatherID).children(".loading").length ) {}else{
           if (typing ) {
    
           } else{
               $("#"+fatherID.id).append("<img class ='loading' src='Cube.svg'/>");
        }
        typing=true;
        //  alert( fatherID.id);
        //  updateTyping(fatherID.id,  $(this).text());
        updateTyping(fatherID.id, $(this).html());*/
    });
  }
}