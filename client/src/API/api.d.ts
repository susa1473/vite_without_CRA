export interface Person {
  _id:string
  name: string;
  lastname: string;
  street: string;
  zipcode: string;
  city: string;
  phone: string;
}

export function getPersons(): Promise<Person[]>; 
export function getPerson(id: string): Promise<Person>;
export function addPerson(person: Person): Promise<Person>;
export function updatePerson(params: Person): Promise<Person>;
export function deletePerson(id: string): Promise<Person>;

