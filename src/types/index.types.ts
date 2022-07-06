export type TileAPIResponse = {
  discovered_by: string;
  x: number;
  y: number;
  max_trees: number;
  available_trees: number;
  npcs: number;
  buildings: number;
  terrain: TerrainAPIResponse;
  edges: [
    {
      name: string;
      pivot: {
        is_road: boolean;
        direction: "north";
      };
    },
    {
      name: string;
      pivot: {
        is_road: boolean;
        direction: "east";
      };
    },
    {
      name: string;
      pivot: {
        is_road: boolean;
        direction: "south";
      };
    },
    {
      name: string;
      pivot: {
        is_road: boolean;
        direction: "west";
      };
    }
  ];
};

export type TerrainAPIResponse = {
  id: number;
  name: TileTerrainType;
  description: string;
};

export type TileTerrainType = "Grass" | "Water" | "Sand" | "Dirt";

export const TileTerrainTypeMap: { [key in TileTerrainType]: TileTerrainObject } = {
  Grass: {
    name: "Grass",
    color: 0x72ad51,
  },
  Water: {
    name: "Water",
    color: 0x34a8eb,
  },
  Sand: {
    name: "Sand",
    color: 0xc2b280,
  },
  Dirt: {
    name: "Dirt",
    color: 0x8a6237,
  },
};

type TileTerrainObject = {
  name: keyof typeof TileTerrainTypeMap;
  color: number;
}

export type TileEdgeDirection = "north" | "east" | "south" | "west";

export const TileEdgeDirectionMap = {
  north: new Phaser.Math.Vector2(0, -1),
  east: new Phaser.Math.Vector2(1, 0),
  south: new Phaser.Math.Vector2(0, 1),
  west: new Phaser.Math.Vector2(-1, 0),
}

export type TileEdge = {
  name: string;
  is_road: boolean;
  direction: TileEdgeDirection;
  _roadCoord: Phaser.Math.Vector2;
};

export type Tree = {
  x: number;
  y: number;
  is_cut: boolean;
};