import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EntityService {
  arrayToEntities(array: any[]) {
    return Object.assign({}, ...array.map(entity => ({ [entity.id]: entity })));
  }

  entitiesToArray(entities: { [id: number]: any }) {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
}
