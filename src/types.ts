export type Coordinate = {
    x: number;
    y: number;
}

export type Tile = {
    discovered_by: string;
    x: number;
    y: number;
    max_trees: number;
    available_trees: number;
    npcs: number
    buildings: number
    edges: [
        {
            name: string;
            pivot: {
                is_road: boolean;
                direction: "north" | "east" | "south" | "west";
            }
        },
        {
            name: string;
            pivot: {
                is_road: boolean;
                direction: "north" | "east" | "south" | "west";
            }
        },
        {
            name: string;
            pivot: {
                is_road: boolean;
                direction: "north" | "east" | "south" | "west";
            }
        },
        {
            name: string;
            pivot: {
                is_road: boolean;
                direction: "north" | "east" | "south" | "west";
            }
        }],
    terrains: [{
        name: string;
        description: string;
    }]
}

export type Tree = {
    x: number;
    y: number;
    is_cut: boolean;
}

export type MappedTile = {
    x: number;
    y: number;
    tile: Tile;
}