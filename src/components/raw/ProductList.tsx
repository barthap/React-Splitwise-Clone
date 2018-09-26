import * as React from 'react';
import NiceList from "../ui/NiceList";
import NiceListItem from "../ui/NiceListItem";

export interface IProductListItem {
    id: number;
    name: string;
    ownerName: string;
    value: number;
}

interface IProductListProps {
    products: IProductListItem[];
    onProductClick: (id: number) => void;
    activeId?: number | null;
}

const ProductList: React.SFC<IProductListProps> = (props) => {
    let items: any[] = [];
    props.products.forEach((p, idx) =>
        items.push(<NiceListItem key={idx}
                                 isActive={props.activeId === p.id}
                                 text={
                                     <span>{p.name}
                                        <small style={{position: 'relative', left: '10%'}}>{p.ownerName}</small>
                                    </span>
                                 }
                                 badgeText={p.value.toFixed(2) + ' $'}
                                 onClick={() => props.onProductClick(p.id)}/>));

    return (<NiceList children={items}/>);
};

ProductList.defaultProps = {
    activeId: null
};

export default ProductList;