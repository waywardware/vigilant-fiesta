export interface IEdible {
    readonly species: string;
}

export interface ISpeed {
    readonly leisure: number;
}

export interface IDiet {
    readonly foodSources: Array<IEdible>;
}
