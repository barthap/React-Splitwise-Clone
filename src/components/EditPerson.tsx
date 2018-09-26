import * as React from 'react';
import {editPerson, EditPersonAction} from "../actions";
import {connect} from "react-redux";
import PersonForm from "./raw/PersonForm";
import {Dispatch} from 'redux';

interface IEditPersonProps {
    personId: number;
    initialName: string;
    dispatchEditPerson: (id: number, name: string) => void;
    onFinished: () => void;
}

class EditPersonRaw extends React.Component<IEditPersonProps> {
    public render() {
        return (
            <PersonForm onSubmit={(name: string) => this.handleSubmit(name)} isCreateForm={false} initialText={this.props.initialName}/>
        );
    }

    private handleSubmit(value: string) {
        this.props.dispatchEditPerson(this.props.personId, value);
        this.props.onFinished();
    }
}

const mapDispatchToProps = (dispatch: Dispatch<EditPersonAction>, ownProps: any) => {
    return {
        dispatchEditPerson: (id: number, name: string) => dispatch(editPerson(id, name)),
        ...ownProps
    }
};

export default connect(()=>{}, mapDispatchToProps)(EditPersonRaw);
