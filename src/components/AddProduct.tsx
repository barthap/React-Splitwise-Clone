import * as React from 'react';
import {IAppState} from "../reducers";
import {Dispatch} from 'redux';
import {addProduct, AddProductAction} from "../actions";
import {connect} from "react-redux";
import ProductForm from "./raw/ProductForm";
import {Person} from "../Logic";

interface IAddProductProps {
    isPersonSelected: boolean;
    selectedPersonName: string | null;
    dispatchAddProduct: (name: string, price: number) => void;
}

class AddProductRaw extends React.Component<IAddProductProps> {
    public render() {
        if (!this.props.isPersonSelected) return this.renderInfoMessage();
        return (
            <ProductForm ownerName={this.props.selectedPersonName || 'N/A'}
                         onSubmit={(name: string, price: number) => this.handleSubmit(name, price)}
                        isCreateForm={true}/>
        );
    }

    private renderInfoMessage() {
        return <p>No product owner is selected! Please select a person first to add product!</p>;
    }

    private handleSubmit(name: string, price: number) {
        console.log('AddProduct handle submit');
        this.props.dispatchAddProduct(name, price);
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
    const isPersonSelected = state.selectedPersonId !== null;
    let selectedPersonName = null;
    if(isPersonSelected) {
        // @ts-ignore
        const selectedPerson: Person = Person.findById(state.selectedPersonId, state.people);
        selectedPersonName = selectedPerson.name;
    }
    return {
        isPersonSelected: isPersonSelected,
        selectedPersonName: selectedPersonName
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AddProductAction>, ownProps: any) => {
    return {
        dispatchAddProduct: (name: string, price: number) => dispatch(addProduct(name, price))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductRaw);
