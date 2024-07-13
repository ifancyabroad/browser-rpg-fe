import { ILevel } from "common/types";
import { RoomType } from "common/utils";

// Tile Locations
const EMPTY_TILE = { x: 0, y: 0 };
const FOREST_TREE_TILE = { x: 4, y: 4 };
const FOREST_GROUND_TILE = { x: 4, y: 10 };
const HAUNTED_HILL_TILE = { x: 7, y: 15 };
const HAUNTED_GROUND_TILE = { x: 7, y: 10 };
const LAVA_TILE = { x: 13, y: 13 };
const LAVA_GROUND_TILE = { x: 13, y: 10 };

// Sprite Locations
const GOBLIN_SPRITE = { x: 5, y: 31 };
const ORC_SPRITE = { x: 5, y: 33 };
const SKELETON_SPRITE = { x: 7, y: 32 };
const REAPER_SPRITE = { x: 12, y: 31 };
const IMP_SPRITE = { x: 13, y: 32 };
const DRAGON_SPRITE = { x: 5, y: 32 };
const TENT_SPRITE = { x: 9, y: 19 };
const CHEST_SPRITE = { x: 8, y: 25 };
const CAMPFIRE_SPRITE = { x: 5, y: 23 };
const STAIRS_SPRITE = { x: 8, y: 24 };
const CABIN_SPRITE = { x: 6, y: 18 };
const GLOWING_CAVE_SPRITE = { x: 13, y: 18 };

const GOBLIN_FOREST: ILevel = {
	name: "Goblin Forest",
	tileLocationMap: {
		[RoomType.None]: EMPTY_TILE,
		[RoomType.Empty]: FOREST_GROUND_TILE,
		[RoomType.Wall]: FOREST_TREE_TILE,
		[RoomType.Battle]: FOREST_GROUND_TILE,
		[RoomType.Boss]: FOREST_GROUND_TILE,
		[RoomType.Shop]: FOREST_GROUND_TILE,
		[RoomType.Treasure]: FOREST_GROUND_TILE,
		[RoomType.Rest]: FOREST_GROUND_TILE,
		[RoomType.Entrance]: FOREST_GROUND_TILE,
		[RoomType.Exit]: FOREST_GROUND_TILE,
	},
	spriteLocationMap: {
		[RoomType.None]: null,
		[RoomType.Empty]: null,
		[RoomType.Wall]: null,
		[RoomType.Battle]: GOBLIN_SPRITE,
		[RoomType.Boss]: ORC_SPRITE,
		[RoomType.Shop]: TENT_SPRITE,
		[RoomType.Treasure]: CHEST_SPRITE,
		[RoomType.Rest]: CAMPFIRE_SPRITE,
		[RoomType.Entrance]: null,
		[RoomType.Exit]: CABIN_SPRITE,
	},
};

const HAUNTED_HILLS: ILevel = {
	name: "Haunted Hills",
	tileLocationMap: {
		[RoomType.None]: EMPTY_TILE,
		[RoomType.Empty]: HAUNTED_GROUND_TILE,
		[RoomType.Wall]: HAUNTED_HILL_TILE,
		[RoomType.Battle]: HAUNTED_GROUND_TILE,
		[RoomType.Boss]: HAUNTED_GROUND_TILE,
		[RoomType.Shop]: HAUNTED_GROUND_TILE,
		[RoomType.Treasure]: HAUNTED_GROUND_TILE,
		[RoomType.Rest]: HAUNTED_GROUND_TILE,
		[RoomType.Entrance]: HAUNTED_GROUND_TILE,
		[RoomType.Exit]: HAUNTED_GROUND_TILE,
	},
	spriteLocationMap: {
		[RoomType.None]: null,
		[RoomType.Empty]: null,
		[RoomType.Wall]: null,
		[RoomType.Battle]: SKELETON_SPRITE,
		[RoomType.Boss]: REAPER_SPRITE,
		[RoomType.Shop]: TENT_SPRITE,
		[RoomType.Treasure]: CHEST_SPRITE,
		[RoomType.Rest]: CAMPFIRE_SPRITE,
		[RoomType.Entrance]: null,
		[RoomType.Exit]: GLOWING_CAVE_SPRITE,
	},
};

const LAVA_CAVE: ILevel = {
	name: "Lava Cave",
	tileLocationMap: {
		[RoomType.None]: EMPTY_TILE,
		[RoomType.Empty]: LAVA_GROUND_TILE,
		[RoomType.Wall]: LAVA_TILE,
		[RoomType.Battle]: LAVA_GROUND_TILE,
		[RoomType.Boss]: LAVA_GROUND_TILE,
		[RoomType.Shop]: LAVA_GROUND_TILE,
		[RoomType.Treasure]: LAVA_GROUND_TILE,
		[RoomType.Rest]: LAVA_GROUND_TILE,
		[RoomType.Entrance]: LAVA_GROUND_TILE,
		[RoomType.Exit]: LAVA_GROUND_TILE,
	},
	spriteLocationMap: {
		[RoomType.None]: null,
		[RoomType.Empty]: null,
		[RoomType.Wall]: null,
		[RoomType.Battle]: IMP_SPRITE,
		[RoomType.Boss]: DRAGON_SPRITE,
		[RoomType.Shop]: TENT_SPRITE,
		[RoomType.Treasure]: CHEST_SPRITE,
		[RoomType.Rest]: CAMPFIRE_SPRITE,
		[RoomType.Entrance]: null,
		[RoomType.Exit]: STAIRS_SPRITE,
	},
};

export const LEVELS = [GOBLIN_FOREST, HAUNTED_HILLS, LAVA_CAVE];
