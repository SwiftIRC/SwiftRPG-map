export type Coordinate = {
  x: number;
  y: number;
};

export type TileEdgeDirection = "north" | "east" | "south" | "west";

export type TileAPIResponse = {
  discovered_by: string;
  x: number;
  y: number;
  max_trees: number;
  available_trees: number;
  npcs: number;
  buildings: number;
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

export type Tree = {
  x: number;
  y: number;
  is_cut: boolean;
};

export type TileEdge = {
  name: string;
  is_road: boolean;
  direction: TileEdgeDirection;
  _roadCoord: Coordinate;
};

export type GridOptions = {
  tileSize: number;
  borderSize: number;
};

export const TileEdgeDirectionMap = {
  north: {
    x: 0, y: -1,
  },
  east: {
    x: 1, y: 0,
  },
  south: {
    x: 0, y: 1,
  },
  west: {
    x: -1, y: 0,
  },
}