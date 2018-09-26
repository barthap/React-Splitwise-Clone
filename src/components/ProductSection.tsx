import * as React from 'react';
import ProductList, {IProductListItem} from "./raw/ProductList";
import {IAppState} from "../reducers";
import {Dispatch} from 'redux';
import {connect} from "react-redux";
import {Product} from "../Logic";
import {deleteProduct, DeleteProductAction, SelectAction, selectProduct} from "../actions";
import Button from "./ui/Button";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import {IProductFormState} from "./raw/ProductForm";

interface IProductSectionProps {
    products: IProductListItem[];
    activeId: number | null;
    onSelect: (id: number) => void;
    onDelete: (id: number) => void;
}

interface IProductSectionState {
    isEditing: boolean;
}

class ProductSectionRaw extends React.Component<IProductSectionProps, IProductSectionState> {
    public constructor(props: any) {
        super(props);

        this.state = {
            isEditing: false
        };
    }
    public render() {
        const toolbox = this.props.activeId !== null ? this.renderToolbox() : <small>No product selected</small>;
        return (<div>
                <ProductList products={this.props.products}
                             activeId={this.props.activeId}
                             onProductClick={(id: number)=>this.props.onSelect(id)}/>
                {this.state.isEditing ? '' : toolbox}

                {this.state.isEditing ? <EditProduct onFinished={() => this.setState({isEditing: false})}
                                                     productId={this.props.activeId || -1}
                                                     initialValues={this.getActiveProductInfo()}/> : <AddProduct/>}
            </div>
        );
    }

    private getActiveProductInfo(): IProductFormState {
        const err = {
            name: '',
            price: 0
        };
        if(!this.props.activeId) return err;

        const prod: IProductListItem|null = this.props.products.find(p => p.id === this.props.activeId) || null;
        if(prod === null) return err;

        return {
            name: prod.name,
            price: prod.value
        };
    }

    private renderToolbox() {
        return <section className="form-group" id="edit-buttons">
            <small>Selected:</small>
            <Button text="Edit" onClick={()=>{this.setState({isEditing: true})}} icon="glyphicon-pencil"/>
            <Button text="Delete" onClick={this.handleDelete.bind(this)} icon="glyphicon-remove"/>
        </section>;
    }

    private handleDelete() {
        const {activeId, onDelete} = this.props;
        if(activeId !== null)
            onDelete(activeId);
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
    return {
        products: Product.getListItemsFromPeople(state.people),
        activeId: state.selectedProductId
    }
};

const mapDispatchToProps = (dispatch: Dispatch<SelectAction | DeleteProductAction>, ownProps: any) => {
    return {
        onSelect: (id: number) => dispatch(selectProduct(id)),
        onDelete: (id: number) => dispatch(deleteProduct(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductSectionRaw);