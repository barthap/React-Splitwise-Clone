import {IPersonListItem} from "./components/raw/PeopleList";
import {IProductListItem} from "./components/raw/ProductList";


export class Product {
    public name: string;
    public value: number;
    public id: number;

    public constructor(id: number, name: string, value: number) {
        this.id = id;
        this.name = name;
        this.value = value;
    }

    public static findById(id: number, arr: Product[]): Product | null {
        return arr.find((item) => item.id === id) || null;
    }
    public static getListItemsFromPeople(arr: Person[]): IProductListItem[] {
        //reduce people to one array by concating ProductListItems array mapped for products of each person
        return arr.reduce((items: IProductListItem[], person: Person) => {
            return items.concat(person.products.map((prod: Product, idx: number) => {
                return {
                    id: prod.id,
                    name: prod.name,
                    ownerName: person.name,
                    value: prod.value
                };
            }));
        }, []);
    }
}

export class Person {
    public id: number;
    public name: string;
    public products: Product[];

    public constructor(id: number, name: string, products: Product[] = []) {
        this.id = id;
        this.name = name;
        this.products = products;
    }

    public getTotalCost(): number {
        return this.products.reduce((prev, curr) => prev + curr.value, 0);
    }

    public static findById(id: number, arr: Person[]): Person | null {
        return arr.find((item) => item.id === id) || null;
    }
    public static getListItems(arr: Person[]): IPersonListItem[] {
        return arr.map((p, idx) => {
            return {
                id: p.id,
                name: p.name,
                cost: p.getTotalCost()
            };
        });
    }
}


class DebtPerson {
    public person: Person;
    public amount: number;

    public constructor(person: Person, how_much: number) {
        this.person = person;
        this.amount = how_much;
    }

    //clears amount
    public Zero() {
        this.amount = 0;
    }

    public Subtract(n: number) {
        this.amount -= n;
    }
}

export const enum TransactionType {
    GIVE = 1,
    RECEIVE = 2
}
export interface ITotalDebt {
    person: Person;
    type: TransactionType;
    amount: number;
}
export interface ITransaction {
    sender: Person;
    receiver: Person;
    amount: number;
}
export interface ICalculationResult {
    peopleCount: number;
    totalValue: number;
    costPerPerson: number;
    transactions: ITransaction[];
    totals: ITotalDebt[];
}
export function Calculate(people: Person[]): ICalculationResult {

    const ppl = people;    //just alias

    //return value struct
    let ret: ICalculationResult = {
        peopleCount: ppl.length,		//count of people
        totalValue: ppl.reduce((sum, person) => sum + person.getTotalCost(), 0),				//totalValue sum
        costPerPerson: 0,		//money per one person
        transactions: [],		//result text
        totals: []
    };

    if(ppl.length == 0)return ret;

    //money per one person = totalValue sum / people count
    ret.costPerPerson = ret.totalValue / ret.peopleCount;

    let debtors: DebtPerson[] = [];	//array of debtors
    let creditors: DebtPerson[] = [];	//array of creditors

    //group people into debtors and creditors
    ppl.forEach(i => {
        let diff = i.getTotalCost() - ret.costPerPerson;      //persons amount/credit

        //if amount is 0, do nothing

        if (diff > 0) {     //if greater than 0, person is creditor
            creditors.push(new DebtPerson(i, diff));

            //if delegate is defined, use delegate, else use default function
            ret.totals.push({
                person: i,
                type: TransactionType.RECEIVE,
                amount: diff
            });
        }
        else if (diff < 0) {    //if less than 0, person is debtor
            debtors.push(new DebtPerson(i, Math.abs(diff)));

            ret.totals.push({
                person: i,
                type: TransactionType.GIVE,
                amount: Math.abs(diff)
            });
        }
    });

    /*
    res.debts = this.people.map((p: Person) => {
            const diff = p.productsValue() - res.costPerPerson;
            return {
                person: p,
                value: -diff
            };
        });
    let debtors: Array<Debt> = res.debts.filter(debt => debt.value > 0);
    let creditors: Array<Debt> = res.debts.filter(debt => debt.value < 0).map(d => { return {...d, value: -d.value}});
     */

    //most tricky part, we find debtors for each creditor
    //cannot use forEach() because of continue;
    for (let c = 0; c < creditors.length; c++) {
        let creditor = creditors[c];
        if (creditor.amount <= 0) continue;   //if creditor is already done, go to next

        //find debtors for current creditor
        for (let d = 0; d < debtors.length; d++) {
            let debtor = debtors[d];
            if (debtor.amount <= 0) continue; //if debtor has no amount, leave him and find next one

            //debtor's amount fully covers creditor's credit
            //he pays amount of creditor's credit
            if (debtor.amount >= creditor.amount) {
                ret.transactions.push({
                    sender: debtor.person,
                    receiver: creditor.person,
                    amount: creditor.amount
                });
                //debtor's amount is lowered by amount of creditor's credit
                debtor.Subtract(creditor.amount);
                creditor.Zero();    //credit fully paid

                break;	//creditor is done, go to the next one
                //this breaks Debtors 'for' loop
            }
            else //when debtor's amount isn't enough to cover creditor's credit
            {    //he pays all of his amount
                ret.transactions.push({
                    sender: debtor.person,
                    receiver: creditor.person,
                    amount: debtor.amount
                });
                //so creditor's has lowered his credit by amount of debtor's amount
                creditor.Subtract(debtor.amount);
                debtor.Zero();  //amount fully paid, done
                                    //lets look for another debtor to pay this credit
            }
        }
    }

    return ret;
}