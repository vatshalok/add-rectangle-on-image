import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "CodeSandbox";

  // constructor(
  //   //private imageMapServices: ImageMapServices
  //   ) {}

  ngOnInit() {
    this.initDrawRect(document.getElementById("canvas"));
    this.deleteElement(document.getElementsByClassName("rectangle"));
  }

  selectRegion(item, type) {}

  initDrawRect(canvas) {
    var setMousePosition = e => {
      var ev = e || window.event; //Moz || IE
      if (ev.pageX) {
        //Moz
        mouse.x = ev.pageX + window.pageXOffset;
        mouse.y = ev.pageY + window.pageYOffset;
      } else if (ev.clientX) {
        //IE
        mouse.x = ev.clientX + document.body.scrollLeft;
        mouse.y = ev.clientY + document.body.scrollTop;
      }
    };

    let mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0
    };
    let elementDiv = null;
    canvas.onmousemove = e => {
      setMousePosition(e);
      if (elementDiv !== null) {
        elementDiv.style.width = Math.abs(mouse.x - mouse.startX) + "px";
        elementDiv.style.height = Math.abs(mouse.y - mouse.startY) + "px";
        elementDiv.style.left =
          mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
        elementDiv.style.top =
          mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";
      }
    };
    canvas.onclick = e => {
      if (elementDiv !== null) {
        elementDiv = null;
        canvas.style.cursor = "default";
        console.log("finish coodinate", mouse);
      } else {
        var numItems = document.getElementsByClassName("rectangle").length;
        console.log("start coodinate", mouse);
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        elementDiv = document.createElement("div");
        elementDiv.className = "rectangle";
        elementDiv.setAttribute("id", "preacq" + numItems++);
        elementDiv.style.left = mouse.x + "px";
        elementDiv.style.top = mouse.y + "px";
        elementDiv.style.border = "solid 2px red";
        elementDiv.style.position = "absolute";
        elementDiv.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
        elementDiv.style.zIndex = "99999";
        canvas.appendChild(elementDiv);

        const button = document.createElement("button");
        button.setAttribute("data-parent-id", "#preacq" + (numItems - 1));
        button.innerHTML = `rectangle${numItems - 1}`;
        button.style.border = "solid 2px red";
        button.style.padding = "10px";
        button.style.marginRight = "10px";
        button.onclick = event => {
          const getId = `preacq${numItems - 1}`;
          const removeDiv = document.getElementById(getId);
          removeDiv.remove();
          event.target.remove();
          return false;
        };
        canvas.nextElementSibling.appendChild(button);
        canvas.style.cursor = "crosshair";
      }
    };
  }

  deleteElement(element) {
    element.onClick = e => {
      console.log(e);
    };
  }
}
