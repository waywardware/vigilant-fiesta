import Animal from "./Animal";
import Plants from "./Plants";
import { IDimensions } from "../engine/Render";
import { IDiet, ISpeed } from "./EntityInterfaces";


let Animals = {
    Rabbit: {
        species: "Rabbit",
        create: (name: string, location: IDimensions) => {
            let diet: IDiet = {foodSources: [{species: Plants.Shrub.species}]};
            let speed: ISpeed = {leisure: 1};
            let size: IDimensions = {x: 1, y: 1};

            return new Animal(name, Animals.Rabbit.species, diet, speed, location, size);
        },
    },
    Dog: {
        species: "Dog",
        create: (name: string, location: IDimensions) => {
            let diet: IDiet = {foodSources: [{species: Animals.Rabbit.species}]};
            let speed: ISpeed = {leisure: 1};
            let size: IDimensions = {x: 1, y: 1};

            return new Animal(name, Animals.Dog.species, diet, speed, location, size);
        },
    },
};


export default Animals;
