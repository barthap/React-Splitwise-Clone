import * as React from 'react';
import '../../main.css';

interface INiceListItemProps {
    text: string | JSX.Element;
    badgeText?: string;
    onClick?: () => void;
    isActive?: boolean;
}

const NiceListItem: React.SFC<INiceListItemProps> = (props) => {
    const className = "list-group-item" + (props.isActive === true ? ' active' : '');
    const badge = props.badgeText !== '' ? <span className="badge">{props.badgeText}</span> : '';
    return (
        <li className={className} onClick={props.onClick}>
            {props.text}
            {badge}
        </li>
    )
};

NiceListItem.defaultProps = {
    badgeText: '',
    onClick: () => {
    },
    isActive: false
};

export default NiceListItem;
