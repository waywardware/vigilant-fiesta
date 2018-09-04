import Animal from "../../../src/common/entities/Animal";
import { IDiet, ISpeed } from "../../../src/common/entities/EntityInterfaces";
import { IDimensions } from "../../../src/common/engine/Render";
import { expect } from "chai";

// tslint:disable:no-unused-expression
describe("Animal Class", () => {
    describe("Identifying food", () => {
        let firstSpecies: string = "firstSpecies";
        let secondSpecies: string = "secondSpecies";
        let thirdSpecies: string = "thirdSpecies";

        let allAnimalDiet: IDiet = {
            foodSources: [
                {species: firstSpecies},
                {species: secondSpecies},
                {species: thirdSpecies},
            ],
        };

        let noSecondSpeciesDiet: IDiet = {
            foodSources: [
                {species: firstSpecies},
                {species: thirdSpecies},
            ],
        };

        let secondSpeciesDiet: IDiet = {
            foodSources: [
                {species: secondSpecies},
            ],
        };

        let speed: ISpeed = {leisure: 0};
        let dummyDimension: IDimensions = {x: 0, y: 0};

        let firstSpeciesFactory = (name: string) => new Animal(name, firstSpecies, secondSpeciesDiet, speed, dummyDimension, dummyDimension);
        let secondSpeciesFactory = (name: string) => new Animal(name, secondSpecies, noSecondSpeciesDiet, speed, dummyDimension, dummyDimension);
        let thirdSpeciesFactory = (name: string) => new Animal(name, thirdSpecies, allAnimalDiet, speed, dummyDimension, dummyDimension);

        let firstSpeciesAnimal: Animal = firstSpeciesFactory("Jimbo first");
        let otherFirstSpeciesAnimal: Animal = firstSpeciesFactory("Bobby first");
        let secondSpeciesAnimal: Animal = secondSpeciesFactory("Billy second");
        let otherSeccondSpeciesAnimal: Animal = secondSpeciesFactory("James second");
        let thirdSpeciesAnimal: Animal = thirdSpeciesFactory("Joe Third");
        let otherThirdSpeciesAnimal: Animal = thirdSpeciesFactory("Doe third");

        it("Should identify an item that is it's food source", () => {
            expect(firstSpeciesAnimal.canEat(secondSpeciesAnimal), "First should be able to eat second").to.be.true;
            expect(secondSpeciesAnimal.canEat(firstSpeciesAnimal), "Second should be able to eat first").to.be.true;
            expect(secondSpeciesAnimal.canEat(thirdSpeciesAnimal), "Second should be able to eat third").to.be.true;
            expect(thirdSpeciesAnimal.canEat(firstSpeciesAnimal), "Third should be able to eat first").to.be.true;
            expect(thirdSpeciesAnimal.canEat(secondSpeciesAnimal), "Third should be able to eat second").to.be.true;
            expect(thirdSpeciesAnimal.canEat(otherThirdSpeciesAnimal), "Third should be able to eat other third").to.be.true;
        });
        it("Should identify an item that is not it's food source", () => {

            expect(firstSpeciesAnimal.canEat(thirdSpeciesAnimal), "First should not be able to eat third").to.be.false;
            expect(firstSpeciesAnimal.canEat(otherFirstSpeciesAnimal), "First should not be able to eat other first").to.be.false;
            expect(secondSpeciesAnimal.canEat(otherSeccondSpeciesAnimal), "Second should not be able to eat other second").to.be.false;
        });
        it("Should identify that it cannot eat itself", () => {
            expect(firstSpeciesAnimal.canEat(firstSpeciesAnimal), "First should not be able to eat itself").to.be.false;
            expect(secondSpeciesAnimal.canEat(secondSpeciesAnimal), "Second should not be able to eat itself").to.be.false;
            expect(thirdSpeciesAnimal.canEat(thirdSpeciesAnimal), "Third should not be able to eat itself").to.be.false;
            expect(thirdSpeciesAnimal.canEat(otherThirdSpeciesAnimal), "Third should be able to eat other third").to.be.true;
        });
    });
});
