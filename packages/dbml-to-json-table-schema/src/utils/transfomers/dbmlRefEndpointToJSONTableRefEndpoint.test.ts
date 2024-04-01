import { dbmlRefEndpointToJSONTableRefEndpoint } from "./dbmlRefEndpointToJSONTableRefEndpoint";

import { dbmlTestCodeInJSONTableFormat, parsedDBML } from "@/tests/data";

describe('transform dbml ref endpoint to json table ref endpoint', () => {
  test('transform ref endpoint', () => {
    expect(dbmlRefEndpointToJSONTableRefEndpoint(parsedDBML.refs[0].endpoints[0])).toEqual(dbmlTestCodeInJSONTableFormat.refs[0].endpoints[0]);
  });
});