import React from 'react';

import PureComponent from '../../base/PureComponent';
import './_pagelist.scss';

export default class PageList extends PureComponent {

    render() {

        const {children} = this.props;

        return (
            <main className="c-pagelist">
                {children}
            </main>
        );
    }

}

PageList.propTypes = {
    children: React.PropTypes.node
};
