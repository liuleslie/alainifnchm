var randSetNum = Math.floor(Math.random() * 25 + 1); // pull one random set of images from 25
var classifications = "Invertebrate,Invertebrate,Urban Legend,Plant Life,Mammal,Plant Life,Urban Legend,Plant Life,Mammal,Mammal,Urban Legend,Invertebrate,Invertebrate,Mammal,Invertebrate,Urban Legend,Urban Legend,Mammal,Urban Legend,Mammal,Urban Legend,Mammal,Invertebrate,Urban Legend,Mammal".split(',');
var w = window.innerWidth;
var h = window.innerHeight;
var i; // generic variable for loops
var imageMode = 'linear '; // for layout options


// --------------- 1. background > should i restrict to certain colors? ---------------
function random_background_color(){
  var die = Math.random();
  var r, g, b, myColor;
  var maxVal = 32; // 127 64
  var rand1 = Math.round(Math.random() * maxVal);
  var rand2 = Math.round(Math.random() * maxVal);
  var rand3 = 0;
  if (die < 0.33) {    // r = 0
    g = rand1;
    b = rand2;
    r = rand3;
  } else if (die < 0.67) {    // g = 0
    r = rand1;
    b = rand2;
    g = rand3;
  } else {    // b = 0
    r = rand1;
    g = rand2;
    b = rand3;
  }
  myColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  document.body.style.background = myColor;
}
random_background_color();


// --------------- 2. images ------------------------------------------------------------
// determine image widths
var thumbw = 170 // * 1.25;  // thumbnail
var thumbh = 95 // * 1.25;   // thumbnail
var ganw = 346 // * 0.75;    // generated
var finw = 256;           // final

// images: layout, spacing, positioning
var horiSpace, vertSpace;
var pageMargin, interImgSpacing;

// variables for layout (spacing) later on
horiSpace = 0;
vertSpace = 0;

pageMargin = w * 0.03; // 3% margin on all sides
interImgSpacing = w * 0.01;

var widecolw = w * 0.4;
var narcolw = w - (2 * pageMargin) - (2 * widecolw) - interImgSpacing;
var temph = (thumbh * widecolw) / thumbw;
thumbh = temph;
thumbw = widecolw;
finw = widecolw;
ganw = narcolw;

// images: setting them down
var sets = ['orig/thumbnails/'+thumbw+'/'+thumbh,'gen/gan/'+ganw+'/'+ganw,'fin/isolated/'+finw+'/'+finw];
for (i = 0; i < sets.length; i++) {
  // organize data
  var sets_id = sets[i].split('/')[0];      // id (which div is this)
  var sets_folder = sets[i].split('/')[1];  // folder name (images)
  var imageW = sets[i].split('/')[2];       // image width (by type)
  var imageH = sets[i].split('/')[3];       // image height (by type)

  // set image dimensions, make background cover
  var myDiv = document.getElementById(sets_id);
  myDiv.style.position = 'absolute';
  myDiv.style.width = imageW + 'px';
  myDiv.style.height = imageH + 'px';
  myDiv.style.backgroundImage = 'url(images/' + sets_folder + '/' + randSetNum + '.png)';
  myDiv.style.backgroundSize = 'cover';
  
  // set horiSpace and vertSpace (push to position)
  if (i == 0) { horiSpace = pageMargin; }
  if (i == 1) { horiSpace += widecolw + interImgSpacing; }
  if (i == 2) { horiSpace += narcolw + interImgSpacing; }
  vertSpace = Math.random() * (h - imageH - (pageMargin * 2)) + pageMargin; // max min formula thing? might need separate heights for different sets

  myDiv.style.left = horiSpace + 'px';
  myDiv.style.top = vertSpace + 'px';

  // adjust margins for overlay
  if (imageMode.includes('stack')) {
    var horiRange = 0.1;
    horiRange *= w;
    if (i == 0) { horiRange *= (-1); }
    var horiDifferential = (Math.random() * horiRange) - horiRange;
    // random vertical movement: +- 0.25 h
    var vertRange = 0.05;
    vertRange *= h;
    var vertDifferential = (Math.random() * vertRange) - vertRange;
    myDiv.style.marginLeft = horiDifferential + 'px';
    myDiv.style.marginTop = vertDifferential + 'px'; 
  }

  // shadow for #gen
  if (imageMode.includes('stack') && (i == 1)) {
    myDiv.style.boxShadow = '0px 0px 30px 0px black';
  }

  // set border color for #fin; changed chartreuse to green bc it was too bright, red to yellow for less of a good/bad (right/wrong) connotation
  if (i == 2) {
    var borderColor;
    if (classifications[randSetNum-1].includes('Invertebrate')) { borderColor = 'white';}
    else if (classifications[randSetNum-1].includes('Urban')) { borderColor = 'aliceblue';} // was 'gray'
    else if (classifications[randSetNum-1].includes('Plant')) { borderColor = 'green';} // was 'chartreuse' and 'blue'
    else { borderColor = 'yellow';} // mammal — was 'red'
    myDiv.style.border = '1px solid ' + borderColor;
    
  } 
}


