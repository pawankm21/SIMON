var level_counter = 1;
colors = ["red", "blue", "yellow", "green"];
index = 0;
pattern = [];

function change_button(color) {
  //load and play sound on click
  try {
    var sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
    // add effects on sound on click
    $("#" + color).addClass("pressed");
    $("#" + color).addClass("pressed");
    setTimeout(function () {
      $("#" + color).removeClass("pressed");
    }, 50);
  } catch (err) {
     var sound = new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").css("background-color", "red");
    
  }
  
}

function wrong_answer() {
  var sound = new Audio("sounds/wrong.mp3");
  sound.play();
  $("body").css("background-color", "red");
  setTimeout(function () {
    $("body").css("background-color", "#011F3F");
  }, 50);
  $("#level-title").html("Game Over <br> Press any key to restart");
}

function create_new_pattern() {
  $("#level-title").html(`level ${level_counter}`);
  new_pattern = [];
  let i = 0;
  while (i < level_counter) {
    new_pattern.push(colors[Math.floor(Math.random() * 4)]);
    i++;
  }
  // console.log(new_pattern);
  return new_pattern;
}

function change_pattern() {
  for (let i = 0; i < pattern.length; i++) {
    setTimeout(function () {
      change_button(pattern[i]);
    }, 1000 * i);
  }
}

function check_pattern(event) {
  if (event.target.id === pattern[index]) {
    index++;
    change_button(event.target.id);
  } else {
    wrong_answer();
    pattern = [];
  }
}

// press any key to start Game
$(document).keypress(function () {
  level_counter = 1;
  pattern = create_new_pattern();
  change_pattern(pattern);
});

//check button presses
$(".btn").click(function (event) {
  if (index < level_counter)
  {
    check_pattern(event);
  }
  setTimeout(function () {
    if (index === level_counter) {
      level_counter++;
      index = 0;
      pattern = create_new_pattern();
      change_pattern();
    }
  }, 1000);
 
  
});
