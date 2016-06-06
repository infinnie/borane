var React = require('react');
var transitionEvents = require('domkit/transitionEvents');
var appendVendorPrefix = require('domkit/appendVendorPrefix');
var DisplacedElement = require("./DisplacedElement.jsx");

module.exports = function (animation) {

    return React.createClass({
        propTypes: {
            className: React.PropTypes.string,
            // Close the modal when esc is pressed? Defaults to true.
            keyboard: React.PropTypes.bool,
            onShow: React.PropTypes.func,
            onHide: React.PropTypes.func,
            animation: React.PropTypes.object,
            backdrop: React.PropTypes.bool,
            closeOnClick: React.PropTypes.bool,
            modalStyle: React.PropTypes.object,
            backdropStyle: React.PropTypes.object,
            contentStyle: React.PropTypes.object
        },

        getDefaultProps: function () {
            return {
                className: "",
                onShow: function () { },
                onHide: function () { },
                animation: animation,
                keyboard: true,
                backdrop: true,
                closeOnClick: true,
                modalStyle: {},
                backdropStyle: {},
                contentStyle: {}
            };
        },

        getInitialState: function () {
            return {
                willHidden: false,
                hidden: true
            }
        },

        hasHidden: function () {
            return this.state.hidden;
        },

        addTransitionListener: function (node, handle) {
            if (node) {
                var endListener = function (e) {
                    if (e && e.target !== node) {
                        return;
                    }
                    transitionEvents.removeEndEventListener(node, endListener);
                    handle();
                };
                transitionEvents.addEndEventListener(node, endListener);
            }
        },

        handleBackdropClick: function () {
            if (this.props.closeOnClick) {
                this.hide();
            }
        },

        render: function () {

            var hidden = this.hasHidden();
            if (hidden) return null;

            var willHidden = this.state.willHidden;
            var animation = this.props.animation;
            var modalStyle = animation.getModalStyle(willHidden);
            var backdropStyle = animation.getBackdropStyle(willHidden);
            var contentStyle = animation.getContentStyle(willHidden);
            var ref = animation.getRef(willHidden);
            var sharp = animation.getSharp && animation.getSharp(willHidden);

            // Apply custom style properties
            if (this.props.modalStyle) {
                var prefixedModalStyle = appendVendorPrefix(this.props.modalStyle);
                for (var style in prefixedModalStyle) {
                    modalStyle[style] = prefixedModalStyle[style];
                }
            }

            if (this.props.backdropStyle) {
                var prefixedBackdropStyle = appendVendorPrefix(this.props.backdropStyle);
                for (var style in prefixedBackdropStyle) {
                    backdropStyle[style] = prefixedBackdropStyle[style];
                }
            }

            if (this.props.contentStyle) {
                var prefixedContentStyle = appendVendorPrefix(this.props.contentStyle);
                for (var style in prefixedContentStyle) {
                    contentStyle[style] = prefixedContentStyle[style];
                }
            }

            var backdrop = this.props.backdrop ? <div style={backdropStyle} onClick={this.props.closeOnClick ? this.handleBackdropClick : null } /> : undefined;

            if (willHidden) {
                var node = this.refs[ref];
                this.addTransitionListener(node, this.leave);
            }

            // vertical alignment inspired by AmazeUI
            return (<DisplacedElement style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    textAlign: "center",
                    zIndex: 1040
                }}>
                <div style={{
                        display: "inline-block",
                        height: "100%",
                        width: 0,
                        verticalAlign: "middle"
                    }}/>
                <div ref="modal" style={modalStyle} className={this.props.className}>
                    {sharp}
                    <div ref="content" tabIndex="-1" style={contentStyle}>
                        {this.props.children}
                    </div>
                </div>
                {backdrop}
            </DisplacedElement>)
            ;
        },

        leave: function () {
            this.setState({
                hidden: true
            });
            this.props.onHide();
        },

        enter: function () {
            this.props.onShow();
        },

        show: function () {
            if (!this.hasHidden()) return;

            this.setState({
                willHidden: false,
                hidden: false
            });

            setTimeout(function () {
                var ref = this.props.animation.getRef();
                var node = this.refs[ref];
                this.addTransitionListener(node, this.enter);
            }.bind(this), 0);
        },

        hide: function () {
            if (this.hasHidden()) return;

            this.setState({
                willHidden: true
            });
        },

        toggle: function () {
            if (this.hasHidden())
                this.show();
            else
                this.hide();
        },

        listenKeyboard: function (event) {
            if (this.props.keyboard &&
                    (event.key === "Escape" ||
                     event.keyCode === 27)) {
                this.hide();
            }
        },

        componentDidMount: function () {
            try {
                window.addEventListener("keydown", this.listenKeyboard, true);
            } catch (x) {
                window.attachEvent("onkeydown", this.listenKeyboard);
            }
        },

        componentWillUnmount: function () {
            try {
                window.removeEventListener("keydown", this.listenKeyboard, true);
            } catch (x) {
                window.detachEvent("onkeydown", this.listenKeyboard);
            }
        }
    });
}
