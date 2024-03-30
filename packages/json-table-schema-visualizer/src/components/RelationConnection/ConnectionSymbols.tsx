import { Circle, Line } from "react-konva";

import { type Position, type XYPosition } from "@/types/positions";

interface RelationsSymbolsProps {
  sourceRelation: string;
  targetRelation: string;
  sourcePosition: Position;
  targetPosition: Position;
  sourceXY: XYPosition;
  targetXY: XYPosition;
  color: string;
}

const RelationsSymbols = ({
  sourcePosition,
  targetPosition,
  sourceRelation,
  sourceXY,
  targetRelation,
  targetXY,
  color,
}: RelationsSymbolsProps) => {
  return (
    <>
      <RelationSymbol
        color={color}
        coord={sourceXY}
        position={sourcePosition}
        relation={sourceRelation}
      />

      <RelationSymbol
        color={color}
        coord={targetXY}
        position={targetPosition}
        relation={targetRelation}
      />
    </>
  );
};

interface RelationsSymbolProps {
  relation: string;
  position: Position;
  coord: XYPosition;
  color: string;
}

const RelationSymbol = ({
  coord,
  position,
  relation,
  color,
}: RelationsSymbolProps) => {
  if (relation === "1") {
    return <Circle {...coord} fill={color} />;
  }

  return <Line {...coord} stroke={color} strokeWidth={2} />;
};

export default RelationsSymbols;
