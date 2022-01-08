import { City } from "./city.model";

export interface LocationValue {
    id : number,
    country : string,
    city : City[]
}