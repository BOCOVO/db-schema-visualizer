import { type JSONTableRef } from "shared/types/tableSchema";

import RelationConnection from "../RelationConnection/RelationConnection";

interface RelationsConnectionsProps {
  refs: JSONTableRef[];
}

const RelationsConnections = ({ refs }: RelationsConnectionsProps) => {
  return refs.map((ref) => {
    const source = ref.endpoints[0];
    const target = ref.endpoints[1];

    const key = `${source.fieldNames[0]}${target.fieldNames[0]}`;

    return <RelationConnection key={key} source={source} target={target} />;
  });
};

export default RelationsConnections;
