import { IDimensions } from "../engine/Render";
import Animal from "./Animal";
import { IDiet, ISpeed } from "./EntityInterfaces";
import Plants from "./Plants";

let Animals = {
    Rabbit: {
        species: "Rabbit",
        create: (name: string, location: IDimensions) => {
            let diet: IDiet = {foodSources: [{species: Plants.Shrub.species}]};
            let speed: ISpeed = {leisure: 1};
            let size: IDimensions = {x: 1, y: 1};

            return new Animal(name, Animals.Rabbit.species, diet, speed, 10 /*maxAge*/, location, size);
        },
    },
    Dog: {
        species: "Dog",
        create: (name: string, location: IDimensions) => {
            let diet: IDiet = {foodSources: [{species: Animals.Rabbit.species}]};
            let speed: ISpeed = {leisure: 1};
            let size: IDimensions = {x: 1, y: 1};

            return new Animal(name, Animals.Dog.species, diet, speed, 20 /*maxAge*/, location, size);
        },
    },
};

export default Animals;
