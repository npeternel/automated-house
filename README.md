# Automated House

An application simulating house automation using JavaScript, JQuery, HTML, and CSS. All code was written from scratch with unless otherwise cited in the source code. Tested on the latest versions of Chrome and Firefox.

## Contents

```
index.html        # Skeleton HTML page
assets/           # Images used on the website
css/              # CSS for styling
js/
  controls/
    index.js          # Centralized list of all controls
    utils.js          # Utility functions used by all controls
    <control-name>.js # Functionality for each control
  initialize.js       # Initializes all rooms and controls
server/data.json      # Static server for initializing the house
```

## Contributing

### Adding a new control

Each control object must implement 2 methods that are both called during the application's initialization. Add your control object and any other necessary functions in a new file in `controls/`, e.g. `controls/mycontrol.js`. Both methods are passed a `room` object containing all of a room's values.

```js
var MyControl = {
  // returns an array of any visual HTML elements to initialize in the room
  // e.g. an array of divs containing the window and curtains
  elements: function(room) {...},
  // returns an HTML element the user interacts with to change a control
  // e.g. a button serving as the light switch
  button: function(room) {...}
}
```

After the user makes any changes through your `button`, be sure to call `updateRoom` to send the changes to the server for persistence (mocked in this static server example).

Add any new asset images or css styling to the `assets/` and `css/` folders respectively.

Add the name of your control object to `Controls` list in `controls/index.js`

```js
var Controls = [
  Light,
  Temperature,
  MyControl
]
```

and in a script tag in the head of `index.html` 

```html
  <script src="js/controls/mycontrol.js"></script>
```

Run using a local http server, such as `python3 -m http.server`

## Future Improvements
* Allow a user to add rooms to the house. Prompt user for a room name, room values, and store the new room in the database.
* Support conversion from Fahrenheit to Celsius
* Save session state to a database
* Include a room position attribute that allows rooms to be situated on the web page according to a home's layout

## Notable Challenges
* Temperature knob implementation involved some geometry, which took a little time for me to refresh in my mind and translate to code.
* JQuery uses the `this` keyword to indicate the current element, which conflicts with the `this` keyword used by JavaScript for self-referencing an object.
* Static JSON files do not allow PUT operations, only GET/POST operations - in this static server example, persistence is primarily driven through the HTML elements.

Reference documentation used during this project:
* [JQuery API Documentation](https://api.jquery.com/)
* [MDN Web Developer Documentation](https://developer.mozilla.org/en-US/)
