// track mouse up, mouse down, and temperature state for each temperature knob
// the index corresponds to the room id
// value of 0 = mouse up
// value of 1 = mouse down
var knobState = [];

var formatTemp = function(temperature) {
  const degreeSymbol = 176;
  const unit = "F";
  return "Temperature:\n" + temperature + String.fromCharCode(degreeSymbol) + unit;
};

var tempToRotation = function(temperature) {
  return Math.floor(2*(temperature - 28));
};

var rotationToTemp = function(rotation) {
  return Math.floor((rotation/2) + 28);
};

var radiansToDegrees = function(radians) {
  return radians * (180/Math.PI);
};

var Temperature = {

  elements: function(room) {
    const elements = [];
    const temperature = $("<div class='temperature-container'><div class='temperature'>" + formatTemp(room.temperature) + "</div></div>");
    elements.push(temperature);
    return elements;
  },

  button: function(room) {
    const knob = $("<img class='temp-knob' src='/assets/knob.png' alt='temperature knob'/>");
    $(knob).css("transform", "rotate(" + tempToRotation(room.temperature) + "deg)");
    knobState.push(0);
    return knob;
  }

};

$(function() {
  $("#house")
    .on("mousedown", ".temp-knob", function (event) {
      event.preventDefault();
      const roomId = getRoomId(this);
      knobState[roomId] = 1;
    })
    .on("mouseup", ".temp-knob", function () {
      // update the temperature in the server after the user has lifted the mouse
      const roomId = getRoomId(this);
      const currTemp = knobState[roomId];
      updateRoom(roomId, { temperature: currTemp });
      knobState[roomId] = 0;
    })
    .on("mousemove", ".temp-knob", function (event) {
      const roomId = getRoomId(this);
      if (knobState[roomId] !== 0) {
        const mid = $(this).width()/2;
        // source for mouse position: https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element/42111623#42111623
        const rect = event.target.getBoundingClientRect();
        const x = mid- (event.clientX - rect.left);
        const y = $(this).height() - (event.clientY - rect.top);

        const xyRadians = Math.atan2(y, x);
        var xyDegrees = Math.floor(radiansToDegrees(xyRadians));
        const lowerBound = 45;
        if (xyDegrees < lowerBound) xyDegrees = lowerBound;
        const upperBound = 135;
        if (xyDegrees > upperBound) xyDegrees = upperBound;
        const roomDegrees = rotationToTemp(xyDegrees);
        $(this).css("transform","rotate(" + xyDegrees + "deg)");
        $(this).parents(".room").find(".temperature").text(formatTemp(roomDegrees));
        knobState[roomId] = roomDegrees;
      }
    });
});
