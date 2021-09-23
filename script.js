var randSetNum = Math.floor(Math.random() * 25 + 1); // pull one random set of images from 25
var classifications = "Invertebrate,Invertebrate,Urban Legend,Plant Life,Mammal,Plant Life,Urban Legend,Plant Life,Mammal,Mammal,Urban Legend,Invertebrate,Invertebrate,Mammal,Invertebrate,Urban Legend,Urban Legend,Mammal,Urban Legend,Mammal,Urban Legend,Mammal,Invertebrate,Urban Legend,Mammal".split(',');
var w = window.innerWidth;
var h = window.innerHeight;
var i; // generic variable for loops
var imageMode = 'linear stack'; // for layout options

// linear stack: responsive issues (need to scroll a little to see full if window is super long and narrow)

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

// resize images (columns)
if (imageMode.includes('linear')) {
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
}
// option 1: linear (left to right)

// option 2: [WORK ON THIS] tabloid stacked. only variable position would be fin, i think
// >>>>> SIZING ISSUES: NEED TO MAKE RESPONSIVE
var longestSide = w;
// if (h < w) {
//   longestSide = h;
// }
if (imageMode.includes('tabloid')) {
  pageMargin = longestSide * 0.1;
  interImgSpacing = longestSide * 0.02;
  // conversions
  // introduce var rowItemLeft
  var tempw = (longestSide - (2 * pageMargin));
  var temph = ((tempw * thumbh)/thumbw);
  thumbw = tempw;
  thumbh = temph;
  ganw = 0.25 * (thumbw - interImgSpacing);
  finw = thumbw - ganw - interImgSpacing;
}

// 0.2, 0.4, 0.6

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
  if (imageMode.includes('linear')) {
    // horizontal + vertical spacing 
    if (i == 0) {
      horiSpace = pageMargin;
    }
    if (i == 1) {
      horiSpace += widecolw + interImgSpacing;
    }
    if (i == 2) {
      horiSpace += narcolw + interImgSpacing;
    }
    // vertical spacing
    vertSpace = Math.random() * (h - imageH - (pageMargin * 2)) + pageMargin; // max min formula thing? might need separate heights for different sets
  }

  if (imageMode.includes('tabloid')) {
    // set horispace and vert space
    if ((i == 0) | (i == 1)) {
      horiSpace = pageMargin;
    }
    else { // i == 2
      horiSpace = pageMargin + ganw + interImgSpacing;
    }
    if (i == 0) { vertSpace = interImgSpacing; }
    else { vertSpace = interImgSpacing + thumbh + interImgSpacing; } // i == 1, i == 2
  }

  myDiv.style.left = horiSpace + 'px';
  myDiv.style.top = vertSpace + 'px';

  // LINEAR, STACKED
  if (imageMode.includes('linear') && imageMode.includes('stack')) {
    // random horizontal movement +- 0.2 w
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

  // TABLOID, STACKED
  if (imageMode.includes('tabloid') && imageMode.includes('stack')) {
    // blah
  }

  // POSSIBLY EXTRANEOUS shadow for #gen (if stacked)
  if (imageMode.includes('stack') && (i == 1)) {
    myDiv.style.boxShadow = '0px 0px 30px 0px black';
  }

  // set border color for #fin
  if (i == 2) {
    var borderColor;
    if (classifications[randSetNum-1].includes('Invertebrate')) { borderColor = 'white';}
    else if (classifications[randSetNum-1].includes('Urban')) { borderColor = 'gray';} 
    else if (classifications[randSetNum-1].includes('Plant')) { borderColor = 'green';} // was 'chartreuse' and 'blue'
    else { borderColor = 'yellow';} // mammal — was 'red'
    //borderColor = 'rgba(0,0,0,0)'; // temp
    myDiv.style.border = '1px solid ' + borderColor;
  } // border color connotations: green = jackpot, red = wrong/bad, white = neutral. maybe sub out for web1 solid css colors?
}




// What would happen if you as a designer gave away those decisions and gave 
// away your ability to articulate each element? For this project, you will create 
// a website using chance to dictate all the stylistic decisions of your single serve website. 
// You will establish a series of global and local variables which will determine all final 
// decisions of your project. You will then use random number generation in javascript to 
// determine the final result. Consider how these variables relate to one another. Push the 
// conditional aspect as far as you possibly can. How does each operation affect the other—if/else? 


// For the content you will use the results of your Uncreative Daisy Chain. Each load of the 
// site will display one set from your final 25 compositions. You may re-evaluate your daisy chain 
// to create more or less text or images but the entirety of both components should fit on a single 
// screen. Remember, consider the idea of quality through quantity. Not every result will be good 
// but through quantity we can see the range and relationships of the overall series. Just like in 
// the daisy chain, the relationship between the image and text and more so between pairs is the 
// value of the project, not the individual results.

