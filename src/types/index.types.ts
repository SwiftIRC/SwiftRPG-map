export type TileAPIResponse = {
  discovered_by: string;
  x: number;
  y: number;
  max_trees: number;
  available_trees: number;
  npcs: TileNPCResponse[];
  users: TileUserResponse[];
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

export type TileTerrainType = "Grass" | "Water" | "Sand" | "Dirt" | "Mountains" | "Forest";

export const TileTerrainTypeMap: { [key in TileTerrainType]: TileTerrainObject } = {
  Grass: {
    name: "Grass",
    color: 0x72ad51,
    texture: "grass",
  },
  Water: {
    name: "Water",
    color: 0x34a8eb,
    texture: "water",
  },
  Sand: {
    name: "Sand",
    color: 0xc2b280,
    texture: "sand",
  },
  Dirt: {
    name: "Dirt",
    color: 0x8a6237,
    texture: "dirt",
  },
  Mountains: {
    name: "Mountains",
    color: 0x8a6237,
    texture: "mountains",
  },
  Forest: {
    name: "Forest",
    color: 0x8a6237,
    texture: "forest",
  }
};

type TileTerrainObject = {
  name: keyof typeof TileTerrainTypeMap;
  color: number;
  texture: string;
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

export type TileUserResponse = { name: string; hitpoints: number };

export type TileNPCResponse = {
  firstName: string;
  lastName: string;
  species: string;
  gender: string;
  occupation: string;
}


export interface TileUser extends TileUserResponse  {
  x: number;
  y: number;
}