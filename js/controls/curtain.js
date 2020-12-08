const OPEN = "open";
const CLOSE = "close";

var curtainValToButton = function(val) {
  // button value displayed to user should be opposite of current curtain value
  return flipCurtainVal(val) + " curtain";
};

var flipCurtainVal = function(val) {
  return val === OPEN ? CLOSE : OPEN;
};

var getCurrentCurtainVal = function(button) {
  // for static server, fetch based on current button value
  // otherwise fetch from server using room Id
  return $(button).text().indexOf(OPEN) > -1 ? CLOSE : OPEN;
};

var curtainValToPosition = function(val) {
  return val === OPEN ? "-80%" : "-50%";
};

var Curtain = {

  elements: function(room) {
    const elements = [];

    // create left and right curtains
    const left = $("<div class='left-curtain'><div><img src='/assets/curtain.gif'/></div></div>");
    const right = $("<div class='right-curtain'><div><img src='/assets/curtain.gif'/></div></div>");
    const pos = curtainValToPosition(room.curtain);
    $(left).css("left", pos);
    $(right).css("right", pos);

    // create a window behind the curtains
    const window = $("<div class='window'><img src='/assets/window.jpg'/></div>");
    const curtain = $("<div class='curtain-container'></div></div>");
    $(curtain).append(...[left, right, window]);
    elements.push(curtain);
    return elements;
  },

  button: function(room) {
    const btn = $("<button type='button'>" + curtainValToButton(room.curtain) + "</button>");
    btn.click(function() {
      const currVal = getCurrentCurtainVal(this);
      const newVal = flipCurtainVal(currVal);
      const newText = curtainValToButton(newVal);
      const newPosition = curtainValToPosition(newVal);

      $(this).text(newText);
      const thisRoom = $(this).parents(".room");
      $(thisRoom).find(".left-curtain").animate({ left: newPosition });
      $(thisRoom).find(".right-curtain").animate({ right: newPosition });

      const roomId = getRoomId(this);
      updateRoom(roomId, { curtain: newVal });
    });
    return btn;
  }

};
