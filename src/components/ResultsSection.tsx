import * as React from 'react';
import {Calculate, ICalculationResult, TransactionType} from "../Logic";
import {IAppState} from "../reducers";
import {Dispatch} from 'redux';
import {connect} from "react-redux";

interface IResultsSectionProps {
    result: ICalculationResult;
}

class ResultsSectionRaw extends React.Component<IResultsSectionProps> {
    public render()
    {
        const { result } = this.props;

        return (<div>
            <h3><small>People count: {result.peopleCount}</small></h3>
            <h3><small>Total products value: {result.totalValue.toFixed(2)} $</small></h3>
            <h3><small>Cost per person: {result.costPerPerson.toFixed(2)} $/person</small></h3>

            <table className="table table-striped">
                <caption>Transaction list</caption>
                <thead>
                <tr>
                    <th>Who gives</th>
                    <th>To whom</th>
                    <th>How much</th>
                </tr>
                </thead>
                <tbody>
                {this.renderTransactionTable(result)}
                </tbody>
            </table>
            <div style={{marginTop: 25}}>
                {this.renderTotals(result)}
            </div>
        </div>);
    }

    private renderTotals(result: ICalculationResult): JSX.Element[] {
        return result.totals.map((t, idx) =>
            <p key={idx} className={t.type === TransactionType.GIVE ? 'text-danger' : 'text-success'}>
                {`${t.person.name} has to ${t.type === TransactionType.GIVE ? 'give' : 'receive'} ${t.amount.toFixed(2)} $ in total`}
            </p>
        );
    }

    private renderTransactionTable(result: ICalculationResult): JSX.Element[] {
        return result.transactions.map((transaction, idx) =>
            <tr key={idx}>
                <td>{transaction.sender.name}</td>
                <td>{transaction.receiver.name}</td>
                <td>{transaction.amount.toFixed(2)} $</td>
            </tr>
        );
    }
}

const mapStateToProps = (state: IAppState, ownProps: any) => {
    return {
        result: Calculate(state.people)
    };
};
​
const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsSectionRaw);
