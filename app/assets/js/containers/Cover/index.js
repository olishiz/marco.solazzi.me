import React, { Component } from 'react';
import { TweenMax, Power2, TimelineMax } from 'gsap';
import classnames from 'classnames';

import './_cover.scss';

import { NAV_PATH_JOBS, NAV_PATH_HOME } from '../../base/constants';
import { createRefs, raf } from '../../base/utils';
import SocialList from '../../components/SocialList';
import Avatar from '../../components/Avatar';
import Ico from '../../components/Ico';
import pic from '../../../images/marco.jpg';



class Cover extends Component {

    constructor(props) {
        super(props);

        createRefs(this, 'root', 'avatar', 'title', 'table', 'footer', 'scrollHint');
    }

    componentDidMount() {
        const { active, visible } = this.props;
        if (active === false || visible === false) {
            TweenMax.set(this.root, {autoAlpha: 0});
        }
    }

    componentDidUpdate({active, visible}) {
        const currentActive = this.props.active;
        const currentVisible = this.props.visible;
        if (currentVisible && currentActive !== active && currentActive === true) {
            TweenMax.set(this.root, {autoAlpha: 1});
            this.root.classList.remove('is-active');
            raf(() => {
                this.root.classList.add('is-active');
            });
            return;
        }
        if (currentVisible !== visible) {
            if (currentVisible === true) {
                this.componentEnter();
            } else {
                this.componentLeave();
            }
        }
    }

    componentLeave() {
        const tl = this.tl = new TimelineMax(); //eslint-disable-line no-multi-assign

        tl.to([this.avatar, this.scrollHint], 0.2, {
            autoAlpha: 0,
            ease: Power2.easeInOut
        })
        .to(this.title, 0.5, {
            yPercent: -300,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '+=0.35')
        .to(this.table, 0.5, {
            yPercent: -200,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '-=0.3')

        .to(this.footer, 0.5, {
            yPercent: -200,
            autoAlpha: 0,
            ease: Power2.easeInOut
        }, '-=0.3')
        .to(this.root, 0.7, {
            yPercent: -100,
            ease: Power2.easeInOut
        })
        .set(this.root, {autoAlpha: 0});

    }

    componentEnter() {
        if (this.tl) {
            this.tl.seek(0).kill(); // Go back to the start (true is to suppress events)
            this.tl = null;
        }

        TweenMax.set(this.root, {autoAlpha: 1});

        TweenMax.fromTo(this.root, 0.8, {
            yPercent: -100
        }, {
            yPercent: 0,
            ease: Power2.easeOut,
            clearProps: 'all'
        });

    }

    render() {

        const { visible, active } = this.props;

        return (
            <section className={classnames('c-cover', {'is-active': active, 'is-leaving': !visible})} ref={this.rootRef} name={NAV_PATH_HOME}>

                <div className="c-cover__pic" ref={this.avatarRef}>
                    <Avatar src={pic} />
                </div>
                <div className="c-cover__body">

                    <h2 className="c-cover__headline" ref={this.titleRef}>こんにちわ！</h2>
                    <article className="c-cover__text" ref={this.tableRef}>
                        <p>My name is <strong>Marco Solazzi</strong></p>
                        <p>I am a 37yo <strong>Frontend Web Developer</strong>, technical <strong>writer</strong> and <strong>speaker</strong> from Verona (Italy). I speak Italian (of course), English, French and some Japanese.</p>
                        <p>Since 2014 I am co-founder and host of the <strong><a href="http://www.fevr.it" target="_blank" rel="noopener noreferrer">FEVR Frontenders Meetup</a></strong> .</p>
                        {/*<Table
                            data={data}
                        />*/}
                    </article>
                    <footer className="c-cover__footer" ref={this.footerRef}>
                        <SocialList />
                    </footer>
                </div>
                <a href={NAV_PATH_JOBS} className="c-cover__scrollhint" ref={this.scrollHintRef}>
                    <span className="u-block">Get to know me</span>
                    <Ico name="chevron-down" />
                </a>
            </section>
        );
    }
}

Cover.propTypes = {
    active: React.PropTypes.bool,
    visible: React.PropTypes.bool
};

Cover.defaultProps = {
    active: false,
    visible: false
};

export default Cover;