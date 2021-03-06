import { Identified, Identifier } from "./identified"
import { Person } from "./person"

export type PersonArray = ReadonlyArray<Identified<Person>>

export interface PersonList {
    readonly persons: PersonArray;
    readonly selectedId: Identifier;
}

export namespace PersonList {
    export const empty: PersonList = {
        persons: [],
        selectedId: 0
    }

    export function loadFrom(storage: Storage, key: string): PersonList {
        const data = storage.getItem(key);
        const list: PersonList = data ? JSON.parse(data) : empty;
        list.persons.map(p => Identified.register(p.id));
        return list;
    }

    export function saveTo(list: PersonList, storage: Storage, key: string): void {
        const data = JSON.stringify(list);
        storage.setItem(key, data);
    }
}