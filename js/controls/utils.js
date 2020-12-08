const updateRoom = function(roomId, roomData) {
  const data = {};
  data[roomId] = roomData;
  // Use GET with static server file implementation, otherwise use PUT
  $.get(SERVER, data, function(response) {
    return response;
  });
};

const getRoomId = function(element) {
  return $(element).parents(".room").attr("id");
};
