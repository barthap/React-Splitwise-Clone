import * as React from 'react';
import Button from "../ui/Button";

interface IAddPersonFormProps {
    isCreateForm: boolean;
    initialText?: string;
    onSubmit: (value: string) => void;
}

interface IAddPersonFormState {
    value: string;
}

const DEFAULT_STATE: IAddPersonFormState = {
    value: ''
};

export default class PersonForm extends React.Component<IAddPersonFormProps, IAddPersonFormState> {
    public constructor(props: any | IAddPersonFormProps) {
        super(props);

        console.log('initial', this.props.initialText);
        this.state = DEFAULT_STATE;
        if(this.props.initialText)
            this.state = {value: this.props.initialText};
    }


    public render() {
        const title = this.props.isCreateForm ? 'ADD PERSON' : 'EDIT PERSON';
        const buttonText = this.props.isCreateForm ? 'Add': 'Save';
        return (
            <section>
                <h4>
                    <small>{title.toUpperCase()}</small>
                </h4>
                <form className="form-inline">
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Name.."
                               value={this.state.value}
                               onChange={this.handleInputChange.bind(this)}
                        />

                        <Button text={buttonText} onClick={this.handleButtonClick.bind(this)} icon="glyphicon-plus"/>

                    </div>
                </form>
            </section>
        );
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({value: event.target.value});
    }
    private handleButtonClick() {
        this.props.onSubmit(this.state.value);
        console.log('PersonForm handle submit', this.state.value);
        this.setState(DEFAULT_STATE);
    }
}