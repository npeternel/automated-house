const SERVER = "/server/data.json";

function initialize () {
  $.get(SERVER, function(data) {
    $.each(data, function(key, room) {
      const roomDiv = $("<div id='" + key + "' class='room'><span>" + room.name + "</span></div>");
      const elementsDiv = $("<div class='elements'></div>");
      const buttonsDiv = $("<div class='control-btns'></div>");
      $.each(Controls, function() {
        $(elementsDiv).append(...this.elements(room));
        const buttonDiv = $("<div class='control-btn-container'></div");
        const ctrlBtn = this.button(room);
        ctrlBtn.addClass("control-btn");
        $(buttonDiv).append(ctrlBtn);
        $(buttonsDiv).append(buttonDiv);
      });
      $(roomDiv).append(...[elementsDiv, buttonsDiv]);
      $("#house").append(roomDiv);
    });
    $("body").append("<div class='credit'>Icons made by <a href='https://www.flaticon.com/authors/good-ware' title='Good Ware'>Good Ware</a> from <a href='https://www.flaticon.com/' title='Flaticon'>www.flaticon.com</a></div>");
  });
}

initialize();
