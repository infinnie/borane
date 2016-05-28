/// <reference path="/node_modules/react/dist/react.js"/>
/// <reference path="/node_modules/react-dom/dist/react-dom.js"/>
var React = window.React || require("react"), ReactDOM = window.ReactDOM || require("react-dom"); // already been fired; IntelliSense compatibility
module.exports = React.createClass({
    render: function () {
        // alert(1);
        return null;
    },

    componentDidMount: function () {
        var insertion = this.props.insertion || document.body,
            div = document.createElement("div");
        if (typeof insertion === "string") {
            insertion = document.querySelector(insertion);
        }
        ReactDOM.render(<div className={this.props.className || ""} style={this.props.style || {}}>{this.props.children}</div>, div);
        insertion.appendChild(div);
        this.insertion = insertion;
        this.div = div;
    },

    componentDidUpdate: function () {
        ReactDOM.render(<div className={this.props.className || ""} style={this.props.style || {}}>{this.props.children}</div>, this.div);
    },

    componentWillUnmount: function () {
        this.insertion.removeChild(this.div);
    }
});