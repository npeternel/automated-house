const ON = "on";
const OFF = "off";

var lightValToButton= function(val) {
  // button value displayed to user should be opposite of current light value
  return "light " + flipLightVal(val);
};

var flipLightVal = function(val) {
  return val === ON ? OFF : ON;
};

var getCurrentLightVal = function(button) {
  // for static server, fetch based on current button value
  // otherwise fetch from server using room Id
  return $(button).text().indexOf(ON) > -1 ? OFF : ON;
};

var lightValToColor = function(val) {
  return val === ON ? "yellow" : "white";
};

var Light = {

  elements: function(room) {
    const elements = [];

    const lightColor = lightValToColor(room.light);
    const light = $("<img class='light' src='/assets/light.png' alt='light'/>").css("background-color", lightColor);
    const lightContainer = $("<div class='light-container'></div>").append(light);
    elements.push(lightContainer);

    return elements;
  },

  button: function(room) {
    const btn = $("<button type='button'>" + lightValToButton(room.light) + "</button>");
    btn.click(function () {
      const roomId = getRoomId(this);
      const currVal = getCurrentLightVal(this);
      const newVal = flipLightVal(currVal);
      const newText = lightValToButton(newVal);
      const newColor = lightValToColor(newVal);
      $(this).text(newText);
      $(this).parents(".room").find(".light").css("background-color", newColor);

      updateRoom(roomId, { light: newVal });
    });
    return btn;
  }

};
