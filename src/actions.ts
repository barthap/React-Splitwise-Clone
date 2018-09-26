
export const SELECT_PERSON = 'SELECT_PERSON';
export type SELECT_PERSON = typeof SELECT_PERSON;

export const SELECT_PRODUCT = 'SELECT_PRODUCT';
export type SELECT_PRODUCT = typeof SELECT_PRODUCT;

export interface SelectProductAction {
    type: SELECT_PRODUCT;
    id: number;
}
export interface SelectPersonAction {
    type: SELECT_PERSON;
    id: number;
}
export type SelectAction = SelectPersonAction | SelectProductAction;

export function selectPerson(id: number) : SelectPersonAction {
    return {
        type: SELECT_PERSON,
        id: id
    };
}
export function selectProduct(id: number) : SelectProductAction {
    return {
        type: SELECT_PRODUCT,
        id: id
    };
}

export const ADD_PERSON = 'ADD_PERSON';
export type ADD_PERSON = typeof ADD_PERSON;
export interface AddPersonAction {
    type: ADD_PERSON;
    name: string;
}
export function addPerson(name: string): AddPersonAction {
    console.log("addPerson action", name);
    return {
        type: ADD_PERSON,
        name: name
    };
}

export const ADD_PRODUCT = 'ADD_PRODUCT';
export type ADD_PRODUCT = typeof ADD_PRODUCT;
export interface AddProductAction {
    type: ADD_PRODUCT;
    name: string;
    value: number;
}
export function addProduct(name: string, value: number): AddProductAction {
    return {
        type: ADD_PRODUCT,
        name: name,
        value: value
    };
}

export const DELETE_PERSON = 'DELETE_PERSON';
export type DELETE_PERSON = typeof DELETE_PERSON;
export interface DeletePersonAction {
    type: DELETE_PERSON;
    id: number;
}
export function deletePerson(id: number): DeletePersonAction {
    return {
        type: DELETE_PERSON,
        id: id
    };
}

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export type DELETE_PRODUCT = typeof DELETE_PRODUCT;
export interface DeleteProductAction {
    type: DELETE_PRODUCT;
    id: number;
}
export function deleteProduct(id: number): DeleteProductAction {
    return {
        type: DELETE_PRODUCT,
        id: id
    };
}

export type DeleteAction = DeleteProductAction | DeletePersonAction;

export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS';
export type CLEAR_PRODUCTS = typeof CLEAR_PRODUCTS;
export interface ClearProductsAction {
    type: CLEAR_PRODUCTS;
    personId: number;
}
export function clearProducts(personId: number): ClearProductsAction {
    return {
        type: CLEAR_PRODUCTS,
        personId: personId
    };
}

export const CLEAR_PEOPLE = 'CLEAR_PEOPLE';
export type CLEAR_PEOPLE = typeof CLEAR_PEOPLE;
export interface ClearPeopleAction {
    type: CLEAR_PEOPLE;
}
export function clearPeople(): ClearPeopleAction {
    return {
        type: CLEAR_PEOPLE
    };
}

export type ClearAction = ClearPeopleAction | ClearProductsAction;

export const EDIT_PERSON = 'EDIT_PERSON';
export type EDIT_PERSON = typeof EDIT_PERSON;
export interface EditPersonAction {
    type: EDIT_PERSON;
    name: string;
    id: number;
}
export function editPerson(id: number, name: string): EditPersonAction {
    return {
        type: EDIT_PERSON,
        name: name,
        id: id
    };
}

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export type EDIT_PRODUCT = typeof EDIT_PRODUCT;
export interface EditProductAction {
    type: EDIT_PRODUCT;
    id: number;
    name: string;
    price: number;
    setSelectedOwner: boolean;
}
export function editProduct(id: number, name: string, price: number, setSelectedOwner: boolean = false): EditProductAction {
    console.log('editProduct action');
    return {
        type: EDIT_PRODUCT,
        id: id,
        name: name,
        price: price,
        setSelectedOwner: setSelectedOwner
    };
}

export type EditAction = EditProductAction | EditPersonAction;