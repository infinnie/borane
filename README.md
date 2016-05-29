Borane  [![npm version](https://badge.fury.io/js/borane.svg)](http://badge.fury.io/js/borane)
=====

Borane is Boron down from IE 9.

* Only React 0.14+

## Demo & Examples

Live demo: https://infinnie.github.io/borane/

To build the examples locally, run:

```
npm install
gulp dev
```

Then open [`localhost:9999`](http://localhost:9999) in a browser.

## Installation

The easiest way to use Borane is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), etc).

You can also use the standalone build by including `dist/borane.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install borane --save
```

## Usage

``` javascript
var Modal = require('borane/DropModal');
var Example = React.createClass({
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.showModal}>Open</button>
                <Modal ref="modal">
                    <h2>I am a dialog</h2>
                    <button onClick={this.hideModal}>Close</button>
                </Modal>
            </div>
        );
    }
});
```

## Props

* className - Add custom class name.
* keyboard - Close the modal when escape key is pressed.
* backdrop - Includes a backdrop element.
* closeOnClick - Close the backdrop element when clicked.
* onShow - Show callback.
* onHide - Hide callback.
* modalStyle - CSS styles to apply to the modal
* backdropStyle - CSS styles to apply to the backdrop
* contentStyle - CSS styles to apply to the modal's content

# Custom Styles
Objects consisting of CSS properties/values can be passed as props to the Modal component.
The values for the CSS properties will either add new properties or override the default property value set for that Modal type.

Modal with 80% width:
``` javascript
var Modal = require('borane/ScaleModal');

// Style object
var modalStyle = {
    width: '80%'
};

var Example = React.createClass({
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.showModal}>Open</button>
                <Modal ref="modal" modalStyle={modalStyle}>
                    <h2>I am a dialog</h2>
                    <button onClick={this.hideModal}>Close</button>
                </Modal>
            </div>
        );
    }
});
```

Red backdrop with a blue modal, rotated at 45 degrees:
``` javascript
var Modal = require('borane/FlyModal');

// Individual styles for the modal, modal content, and backdrop
var modalStyle = {
    transform: 'rotate(45deg) translateX(-50%)',
};

var backdropStyle = {
    backgroundColor: 'red'
};

var contentStyle = {
    backgroundColor: 'blue',
    height: '100%'
};

var Example = React.createClass({
    showModal: function(){
        this.refs.modal.show();
    },
    hideModal: function(){
        this.refs.modal.hide();
    },
    render: function() {
        return (
            <div>
                <button onClick={this.showModal}>Open</button>
                <Modal ref="modal" modalStyle={modalStyle} backdropStyle={backdropStyle} contentStyle={contentStyle}>
                    <h2>I am a dialog</h2>
                    <button onClick={this.hideModal}>Close</button>
                </Modal>
            </div>
        );
    }
});
```


## Modals

* DropModal
* FadeModal
* FlyModal
* OutlineModal
* ScaleModal
* WaveModal

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
IE 9+ ✔ | Chrome 4.0+ ✔ | Firefox 16.0+ ✔ | Opera 15.0+ ✔ | Safari 4.0+ ✔ |

## License

Borane is [MIT licensed](./LICENSE).
