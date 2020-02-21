import { State } from './state';
export class City {
    id: string;
    name: string;
    ibge: string;
    state: State;

    public City() {
        this.state = new State();
    }
}
