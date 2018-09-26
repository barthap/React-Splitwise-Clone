import * as React from 'react';
import '../../main.css';

const NiceList: React.SFC = (props) => {
        return (
            <ul className="list-group">
                {props.children}
            </ul>
        )

};

export default NiceList;