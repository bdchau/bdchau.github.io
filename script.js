var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// when open button pressed, open a case
document.getElementById("click").onclick = open;

// weapon list (200 blues, 40 purples, 12 pinks, 2 reds, 1 yellow)
var weapons = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
                        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                        2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,
                        3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
                        4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,
                        5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,
                        6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,
                        7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,
                        10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,
                        12,12,12,12,13,13,13,13,14,14,14,14,
                        15,16,
                        17);

var unbox = new Array("Shred - $0.18", "Survivalist - $0.17", "Capillary - $0.17",
                    "Slipstream - $0.18", "Snek-9 - $0.17", "Traction - $0.18",
                    "Warhawk - $0.22", "High Seas - $0.44", "Toy Soldier - $0.46",
                    "Power Core - $0.46", "Eco - $0.49", "PAW - $4.32",
                    "Eye of Athena - $4.16", "Devourer - $4.00", "Nightmare - $6.75",
                    "Code Red - $27.88", "Neon Rider - $54.83", "Stiletto - $336.03");

// image variables
var srcX = 0;
var srcY = 0;
var x = 0;
var y = 0;
var img = new Image();
var temp = 0;

// open up a case
function open() {
    // select a random item number
    var skin = Math.floor(Math.random() * 255);
    // select skin based on number
    if (weapons[skin] == 0) {
        console.log("shred");
        info(0.18, "blue", 0);
    } else if (weapons[skin] == 1) {
        console.log("survivalist");
        info(0.17, "blue", 1);
    } else if (weapons[skin] == 2) {
        console.log("capillary");
        info(0.17, "blue", 2);
    } else if (weapons[skin] == 3) {
        console.log("slipstream");
        info(0.18, "blue", 3);
    } else if (weapons[skin] == 4) {
        console.log("snek");
        info(0.17, "blue", 4);
    } else if (weapons[skin] == 5) {
        console.log("traction");
        info(0.18, "blue", 5);
    } else if (weapons[skin] == 6) {
        console.log("warhawk");
        info(0.22, "blue", 6);
    } else if (weapons[skin] == 7) {
        console.log("high seas");
        info(0.44, "purple", 7);
    } else if (weapons[skin] == 8) {
        console.log("toy soldier");
        info(0.46, "purple", 8);
    } else if (weapons[skin] == 9) {
        console.log("power core");
        info(0.46, "purple", 9);
    } else if (weapons[skin] == 10) {
        console.log("eco");
        info(0.49, "purple", 10);
    } else if (weapons[skin] == 11) {
        console.log("paw");
        info(4.32, "purple", 11);
    } else if (weapons[skin] == 12) {
        console.log("eye of athena");
        info(4.16, "pink", 12);
    } else if (weapons[skin] == 13) {
        console.log("devourer");
        info(4.00, "pink", 13);
    } else if (weapons[skin] == 14) {
        console.log("nightmare");
        info(6.75, "pink", 14);
    } else if (weapons[skin] == 15) {
        console.log("code red");
        price = 27.88;
        info(27.88, "red", 15);
    } else if (weapons[skin] == 16) {
        console.log("neon rider");
        info(54.93, "red", 16);
    } else if (weapons[skin] == 17) {
        console.log("knife");
        info(336.03, "yellow", 17);
    }
}

/* update text info on html page for weapon skin unboxed, total money spent,
 earned, and rarity types */
function info(add, rarity, image) {
    document.getElementById("unbox text").innerHTML = unbox[image];

    var originalSpent = parseFloat(document.getElementById("spent").innerHTML);
    document.getElementById("spent").innerHTML = (originalSpent + 2.50).toFixed(2);

    var originalEarned = parseFloat(document.getElementById("earned").innerHTML);
    document.getElementById("earned").innerHTML = (originalEarned + add).toFixed(2);

    var originalRarity = parseFloat(document.getElementById(rarity).innerHTML);
    document.getElementById(rarity).innerHTML = originalRarity + 1;

    setup(image);
}

// cycle through the images
function drawAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, srcX, srcY, size, size, x, y, size, size);

    // when the spritesheet reaches the end, finish the animation
    if (srcX < img.width - size) {
        srcX += size;
    }
}

// setup the image/sprite sheet
function setup(num) {

    if (num != null) {
      img.src = 'sprites/' + num + '.png';
    } else {
      img.src = 'sprites/lootbox.png';
    }

    // wait for image to load
    img.onload = function() {
      console.log(img.src);

      canvas.width = img.height;
      canvas.height = img.height;
      size = canvas.width;
      srcX = 0;

      // set drawing interval/play the spritesheet, or use background image
      if (num != null) {
        clearInterval(temp);
        temp = setInterval(drawAnimation, 1000 / 40);
      } else {
        ctx.drawImage(img, 0, 0, size, size);
      }
    }
}

// run setup on page load for bg
window.onload = setup(null);
