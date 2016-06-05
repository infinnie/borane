var modalFactory = require('./modalFactory.jsx');
var insertKeyframesRule = require('./insertKeyframesRule');
var appendVendorPrefix = require('domkit/appendVendorPrefix');

var animation = {
    show: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    hide: {
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
    },

    showModalAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0,
            transform: 'translate3d(0, -300px, 0)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(0,0, 0)'
        }
    }),

    hideModalAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(0, 100px, 0)'
        }
    }),

    showBackdropAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0
        },
        '100%': {
            opacity: 0.9
        }
    }),

    hideBackdropAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0.9
        },
        '100%': {
            opacity: 0
        }
    }),

    showContentAnimation: insertKeyframesRule({
        '0%': {
            opacity: 0,
            transform: 'translate3d(0, -20px, 0)'
        },
        '38%': {
            opacity: 0,
            transform: 'translate3d(0, -20px, 0)'
        },
        '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        }
    }),

    hideContentAnimation: insertKeyframesRule({
        '0%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        },
        '38%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)'
        },
        '100%': {
            opacity: 0,
            transform: 'translate3d(0, 50px, 0)'
        }
    })
};

var showAnimation = animation.show;
var hideAnimation = animation.hide;
var showModalAnimation = animation.showModalAnimation;
var hideModalAnimation = animation.hideModalAnimation;
var showBackdropAnimation = animation.showBackdropAnimation;
var hideBackdropAnimation = animation.hideBackdropAnimation;
var showContentAnimation = animation.showContentAnimation;
var hideContentAnimation = animation.hideContentAnimation;

module.exports = modalFactory({
    getRef: function (willHidden) {
        return 'modal';
    },
    getModalStyle: function (willHidden) {
        return appendVendorPrefix({
            width: "500px",
            zIndex: 1050,
            display: "inline-block",
            position: "relative",
            verticalAlign: "middle",
            backgroundColor: "white",
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideModalAnimation : showModalAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        })
    },
    getBackdropStyle: function (willHidden) {
        return appendVendorPrefix({
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            zIndex: 1040,
            backgroundColor: "#373A47",
            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
            animationFillMode: 'forwards',
            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction,
            filter:"alpha(opacity=90)" // IE 8, 9
        });
    },
    getContentStyle: function (willHidden) {
        return appendVendorPrefix({
            margin: 0,
            //opacity: 0,
            animationDuration: parseFloat((willHidden ? hideAnimation : showAnimation).animationDuration) + .25 + "s",
            animationFillMode: 'forwards',
            //animationDelay: '0.25s',
            animationName: showContentAnimation,
            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
        })
    }
});
