var haveEvents = 'ongamepadconnected' in window;
var controllers = {};

function connecthandler(e) {
    addgamepad(e.gamepad);
}

function addgamepad(gamepad) {
    controllers[gamepad.index] = gamepad;

    var d = document.createElement("div");
    d.setAttribute("id", "controller" + gamepad.index);

    var t = document.createElement("div");
    let img = document.createElement("img")
    img.src = "art/indicator.png"
    img.style.position = "absolute"
    img.style.left = "15px"
    img.style.top = "130px"
    t.appendChild(img);
    d.appendChild(t);

    // var b = document.createElement("div");
    // b.className = "buttons";
    /*for (var i = 0; i < gamepad.buttons.length; i++) {
        var e = document.createElement("span");
        e.className = "button";
        //e.id = "b" + i;
        e.innerHTML = i;
        b.appendChild(e);
    }*/

    // d.appendChild(b);

    // var a = document.createElement("div");
    // a.className = "axes";

/*    for (var i = 0; i < gamepad.axes.length; i++) {
        var p = document.createElement("progress");
        p.className = "axis";
        p.id = "a" + i;
        p.setAttribute("max", "2");
        p.setAttribute("value", "1");
        p.innerHTML = i;
        a.appendChild(p);
    }*/

//    d.appendChild(a);

    // See https://github.com/luser/gamepadtest/blob/master/index.html
    var start = document.getElementById("start");
    if (start) {
        start.style.display = "none";
    }

    document.body.appendChild(d);
    requestAnimationFrame(updateStatus);
}

function disconnecthandler(e) {
    removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
    var d = document.getElementById("controller" + gamepad.index);
    document.body.removeChild(d);
    delete controllers[gamepad.index];
}

function updateStatus() {
    if (!haveEvents) {
        scangamepads();
    }

    var i = 0;
    var j;


    for (j in controllers) {
        var controller = controllers[j];
        var d = document.getElementById("controller" + j);
     //   var buttons = d.getElementsByClassName("button");

      /*  for (i = 0; i < controller.buttons.length; i++) {
            var b = buttons[i];
            var val = controller.buttons[i];
            var pressed = val == 1.0;
            if (typeof(val) == "object") {
                pressed = val.pressed;
                val = val.value;
            }

            var pct = Math.round(val * 100) + "%";
            b.style.backgroundSize = pct + " " + pct;

            if (pressed) {
                b.className = "button pressed";
            } else {
                b.className = "button";
            }
        }*/


        // let  axes = d.getElementsByClassName("axis");
        let yangle = controller.axes[0] * 90;
        let xangle = controller.axes[1] * 90; //
        let uangle = controller.axes[5] * 90; // Roll Axis

        document.getElementById("pitch").style.transform = 'rotate('+xangle.toFixed(2)+'deg)';
        document.getElementById("yaw").style.transform = 'rotate('+yangle.toFixed(2)+'deg)';
        document.getElementById("roll").style.transform = 'rotate('+uangle.toFixed(2)+'deg)';

        /*for (i = 0; i < controller.axes.length; i++) {
            var a = axes[i];
            a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
            a.setAttribute("value", controller.axes[i] + 1);
        }*/
   }

    requestAnimationFrame(updateStatus);
}

function scangamepads() {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    for (var i = 0; i < gamepads.length; i++) {
        if (gamepads[i]) {
            if (gamepads[i].index in controllers) {
                controllers[gamepads[i].index] = gamepads[i];
            } else {
                addgamepad(gamepads[i]);
            }
        }
    }
}

window.addEventListener("gamepadconnected", connecthandler);
window.addEventListener("gamepaddisconnected", disconnecthandler);

if (!haveEvents) {
    setInterval(scangamepads, 500);
}