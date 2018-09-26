import * as React from 'react';
import {IAppState} from "../reducers";
import {Dispatch} from 'redux';
import {editProduct, EditProductAction} from "../actions";
import {connect} from "react-redux";
import ProductForm, {IProductFormState} from "./raw/ProductForm";
import {Person} from "../Logic";

interface IEditProductProps {
    initialValues: IProductFormState;
    isPersonSelected: boolean;
    selectedPersonName: string | null;
    dispatchEditProduct: (id: number, name: string, price: number, changeOwner: boolean) => void;
    onFinished: () => {}
    productId: number;
}
interface IEditProductState {
    changeOwnerSelected: boolean
}

class EditProductRaw extends React.Component<IEditProductProps, IEditProductState> {

    public constructor(props: any) {
        super(props);

        this.state= {
            changeOwnerSelected: false
        };
    }

    public render() {
        const ownerInfo = <p>New product owner will be: <b>{this.props.selectedPersonName}</b></p>;
        const displayOwnerInfo: boolean = this.state.changeOwnerSelected;
        const noOwnerMessage = <p>Please select new product owner from the list!</p>;

        const ownerMessage = this.props.isPersonSelected ? ownerInfo : noOwnerMessage;

        return (<ProductForm ownerName={this.props.selectedPersonName || 'N/A'}
                         initialValues={this.props.initialValues}
                         onSubmit={(name: string, price: number) => this.handleSubmit(name, price)}
                        isCreateForm={false}>
                <label>Switch owner: <input type="checkbox"
                                            onChange={this.switchCheckboxState.bind(this)}
                                            checked={this.state.changeOwnerSelected}/>
                </label>
                {displayOwnerInfo ? ownerMessage : ''}
            </ProductForm>
        );
    }

    private switchCheckboxState(event: React.FormEvent<HTMLInputElement>) {
        const checkboxState = event.currentTarget.checked;

        this.setState({
            changeOwnerSelected: checkboxState
        });
    }

    private handleSubmit(name: string, price: number) {
        console.log('EditProduct handleSubmit()');
        const shouldChangeOwner: boolean = this.state.changeOwnerSelected && this.props.isPersonSelected;
        this.props.dispatchEditProduct(this.props.productId, name, price, shouldChangeOwner);
        this.props.onFinished();
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
        selectedPersonName: selectedPersonName,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<EditProductAction>, ownProps: any) => {
    return {
        dispatchEditProduct: (id: number, name: string, price: number, changeOwner: boolean) => dispatch(editProduct(id, name, price, changeOwner))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductRaw);
