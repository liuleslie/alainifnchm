var randSetNum = Math.floor(Math.random() * 25 + 1); // pull one random set of images from 25
var classifications = "Invertebrate,Invertebrate,Urban Legend,Plant Life,Mammal,Plant Life,Urban Legend,Plant Life,Mammal,Mammal,Urban Legend,Invertebrate,Invertebrate,Mammal,Invertebrate,Urban Legend,Urban Legend,Mammal,Urban Legend,Mammal,Urban Legend,Mammal,Invertebrate,Urban Legend,Mammal".split(',');
var w = window.innerWidth;
var h = window.innerHeight;
var i; // generic variable for loops

// rn: hoping to clean up positioning/margin code

// 1.    background > should i restrict to certain colors?
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

// 2.     images > was hoping to use naturalWidth/Height to maintain dimensions; this is a rough fix

// determine image widths
var thumbw = 170 * 1.25;  // thumbnail
var thumbh = 95 * 1.25;   // thumbnail
var ganw = 346 * 0.75;    // generated
var finw = 256;           // final

// layout options: randomize here
var imageMode = '0';
var marginsVert = 0.1 * h;  // 10% space, top + bottom
var marginsHori = 0.1 * w;  // 10% space, left + right



// for later: positioning
var horiSpace, vertSpace;

// 0: left to right, small gen
if (imageMode.includes('0')) {
  ganw *= 0.5;
}
if (imageMode.includes('stack')) {
  // stack it
  console.log('stacced')
}

var sets = ['orig/thumbnails/'+thumbw+'/'+thumbh,'gen/gan/'+ganw+'/'+ganw,'fin/isolated/'+finw+'/'+finw];
for (i = 0; i < sets.length; i++) {
  // organize data
  var sets_id = sets[i].split('/')[0];
  var sets_folder = sets[i].split('/')[1];
  var imageW = sets[i].split('/')[2];
  var imageH = sets[i].split('/')[3];

  // set image dimensions
  var myDiv = document.getElementById(sets_id);
  myDiv.style.position = 'absolute';
  myDiv.style.width = imageW + 'px';
  myDiv.style.height = imageH + 'px';
  myDiv.style.backgroundImage = 'url(images/' + sets_folder + '/' + randSetNum + '.png)';
  myDiv.style.backgroundSize = 'cover';


  // position >>> z index?
  myDiv.style.marginTop = marginsVert + 'px';
  if (i == 0) { horiSpace = (marginsHori*0.5); }
  if (i == 1) { horiSpace = (thumbw*1.5);}
  else if (i == 2) { horiSpace = ((thumbw*1.25)+marginsHori) + ganw;}
  vertSpace = Math.random() * (0.5 * h) + (marginsVert);

  myDiv.style.marginLeft = horiSpace + 'px';
  myDiv.style.marginTop = vertSpace + 'px';


  // set border color for #fin
  if (i == 2) {
    var borderColor;
    if (classifications[randSetNum-1].includes('Invertebrate')) { borderColor = 'white';}
    else if (classifications[randSetNum-1].includes('Urban')) { borderColor = 'gray';} 
    else if (classifications[randSetNum-1].includes('Plant')) { borderColor = 'chartreuse';} 
    else { borderColor = 'red';}
    myDiv.style.border = '1px solid ' + borderColor;
  }
}


// all that's changed: 
//    size of image
//    orientation: how spaced out — should there be diagonals?




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

