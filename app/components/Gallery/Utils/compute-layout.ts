import type { IPhoto } from "../Gallery";
import { findShortestPath } from "./dijkstra";
import type { TGraphFunc, TNode } from "./dijkstra";
import { round } from "./round";

// return two decimal places rounded number
export const ratio = ({ width, height }: IPhoto) => round(width / height, 2);

// compute sizes by creating a graph with rows as edges and photo to break on as nodes
// to calculate the single best layout using Dijkstra's findShortestPat

// get the height for a set of photos in a potential row
const getCommonHeight = (
  row: IPhoto[],
  containerWidth: number,
  margin: number
) => {
  const rowWidth = containerWidth - row.length * (margin * 2);
  const totalAspectRatio = row.reduce((acc, photo) => acc + ratio(photo), 0);
  return rowWidth / totalAspectRatio;
};

// calculate the cost of breaking at this node (edge weight)
const cost = (
  photos: IPhoto[],
  i: number,
  j: number,
  width: number,
  targetHeight: number,
  margin: number
) => {
  const row = photos.slice(i, j);
  const commonHeight = getCommonHeight(row, width, margin);
  return Math.pow(Math.abs(commonHeight - targetHeight), 2);
};

// return function that gets the neighboring nodes of node and returns costs
const makeGetNeighbors =
  (
    targetHeight: number,
    containerWidth: number,
    photos: IPhoto[],
    limitNodeSearch: number,
    margin: number
  ): TGraphFunc =>
  (start) => {
    const results: TNode = {};
    start = +start;
    results[+start] = 0;
    for (let i = start + 1; i < photos.length + 1; ++i) {
      if (i - start > limitNodeSearch) break;
      results[i] = cost(photos, start, i, containerWidth, targetHeight, margin);
    }
    return results;
  };

interface IComputeRowLayiutArg {
  containerWidth: number;
  limitNodeSearch: number;
  targetRowHeight: number;
  margin: number;
  photos: IPhoto[];
}

export const computeRowLayout = ({
  containerWidth,
  limitNodeSearch,
  targetRowHeight,
  margin,
  photos,
}: IComputeRowLayiutArg) => {
  const getNeighbors = makeGetNeighbors(
    targetRowHeight,
    containerWidth,
    photos,
    limitNodeSearch,
    margin
  );
  let path = findShortestPath(getNeighbors, 0, photos.length);
  path = path.map((node) => +node);
  for (let i = 1; i < path.length; ++i) {
    const row = photos.slice(path[i - 1], path[i]);
    const height = getCommonHeight(row, containerWidth, margin);
    for (let j = path[i - 1]; j < path[i]; ++j) {
      photos[j].width = round(height * ratio(photos[j]), 1);
      photos[j].height = height;
    }
  }
  return photos;
};
