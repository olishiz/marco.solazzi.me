import React, { Component } from 'react';
import { TweenMax, Power3 } from 'gsap';

import { createRefs } from '../../base/utils';

import './_intro.scss';


class Intro extends Component {

    constructor(props) {
        super(props);

        createRefs(this, 'body');
    }

    componentWillAppear(callback) {

        TweenMax.fromTo(this.body, 0.5, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            onComplete: callback
        });
    }

    componentWillLeave(callback) {
        TweenMax.to(this.body, 0.35, {
            xPercent: -5,
            autoAlpha: 0,
            onComplete: callback,
            ease: Power3.easeOut
        });
    }

    render() {
        return (
            <header className="c-intro">
                <div className="c-intro__body h1" ref={this.bodyRef}>
                    <span className="c-intro__line">Geeks.query(</span>
                    <span className="c-intro__line">    '/usr/<mark className="u-type--mark">marco+solazzi</mark>',</span>
                    <span className="c-intro__line">    'job=<mark className="u-type--mark">frontend</mark>'</span>
                    <span className="c-intro__line">).then((me) => ...</span>
                </div>
            </header>
        );
    }
}

export default Intro;