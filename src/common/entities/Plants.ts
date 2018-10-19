import Plant from "./Plant";
import { IDimensions } from "../engine/Render";
import { IDiet, ISpeed } from "./EntityInterfaces";

let Plants = {
    Shrub: {
        species: "Shrub",
        create: (name: string, location: IDimensions) => {
            let size: IDimensions = {x: 1, y: 1};

            return new Plant(name, Plants.Shrub.species, location, size);
        },
    },
};
export default Plants;
