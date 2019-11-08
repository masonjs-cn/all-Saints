var cvs = document.getElementById("cvs");
var ctx = cvs.getContext("2d");
var exportImage = document.getElementById("export");
var img = document.getElementById("img");
var hat = "hat0";
var canvasFabric;
var hatInstance;
var screenWidth = window.screen.width < 500 ? window.screen.width-50 : 300;
let bestWidth = `${window.screen.width * 0.9}px`
document.getElementById("uploadContainer").style.height = bestWidth
document.getElementById("uploadContainer").style.width = bestWidth
document.getElementById("upload").style.height = bestWidth
document.getElementById("upload").style.width = bestWidth
document.getElementById("uploadImg").style.width = bestWidth
document.getElementById("uploadImg").style.width = bestWidth

function viewer() {
    var file = document.getElementById("upload").files[0];
    console.log(file);
    var reader = new FileReader;
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            img.src = reader.result;
            img.onload = function () {
                img2Cvs(img)
            }
        }
    } else {
        img.src = ""
    }
}

function img2Cvs(img) {
    cvs.width = img.width;
    cvs.height = img.height;
    cvs.style.display = "block";
    canvasFabric = new fabric.Canvas("cvs", {
        width: screenWidth,
        height: img.height * screenWidth / img.width,
        // height: screenWidth,
        backgroundImage: new fabric.Image(img, {
            scaleX: screenWidth / img.width,
            // scaleY: screenWidth / img.height
            scaleY: screenWidth / img.width

        })
    });
    changeHat();
    document.getElementById("uploadContainer").style.display = "none";
    document.getElementById("uploadText").style.display = "none";
    document.getElementById("upload").style.display = "none";
    document.getElementById("change").style.display = "block";
    document.getElementById("exportBtn").style.display = "block";
    document.getElementById("tip").style.opacity = 1
}

function changeHat() {
    document.getElementById(hat).style.display = "none";
    var hats = document.getElementsByClassName("hide");
    hat = "hat" + (+ hat.replace("hat", "") + 1) % hats.length;
    var hatImage = document.getElementById(hat);
    hatImage.style.display = "block";
    if (hatInstance) {
        canvasFabric.remove(hatInstance)
    }
    
    outputscreen= {
        width:hatImage.width,
        height:hatImage.height
    }

    hatInstance = new fabric.Image(hatImage, {
        top: 40,
        left: screenWidth / 3,
        scaleX: 100 / hatImage.width,
        scaleY: 100 / hatImage.height,
        cornerColor: "#0b3a42",
        cornerStrokeColor: "#fff",
        cornerStyle: "circle",
        transparentCorners: false,
        rotatingPointOffset: 30
    });
    hatInstance.setControlVisible("bl", false);
    hatInstance.setControlVisible("tr", false);
    hatInstance.setControlVisible("tl", false);
    hatInstance.setControlVisible("mr", false);
    hatInstance.setControlVisible("mt", false);
    canvasFabric.add(hatInstance)
}

function exportFunc() {
    document.getElementsByClassName("canvas-container")[0].style.display = "none";
    document.getElementById("exportBtn").style.display = "none";
    document.getElementById("tip").innerHTML = "长按图片保存或分享";
    document.getElementById("reUpload").style.display = "block";
    document.getElementById("change").style.display = "none";
    cvs.style.display = "none";
    exportImage.style.display = "block";
 
    exportImage.src = canvasFabric.toDataURL({
        width: screenWidth,
        height: cvs.height * screenWidth / cvs.width,
    })
}

function reUpload() {
    location.reload() 
}