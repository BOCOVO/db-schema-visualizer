import Table from "../Table";

import RelationConnection from "./RelationConnection";

import type { Meta, StoryObj } from "@storybook/react";

import { exampleData } from "@/fake/fakeJsonTables";
import TablesInfoProvider from "@/providers/TablesInfoProvider";
import RelationalFieldsSetProvider from "@/providers/RelationalFieldsSetProvider";

const meta: Meta = {
  component: RelationConnection,
  title: "components/RelationConnection",
};

export default meta;

type Story = StoryObj<typeof RelationConnection>;

export const TableStory: Story = {
  render: (props) => (
    <RelationalFieldsSetProvider refs={exampleData.refs}>
      <TablesInfoProvider tables={exampleData.tables}>
        <RelationConnection {...props} />

        <Table {...exampleData.tables[0]} />

        <Table {...exampleData.tables[1]} />
      </TablesInfoProvider>
    </RelationalFieldsSetProvider>
  ),
  args: {
    source: exampleData.refs[0].endpoints[0],
    target: exampleData.refs[0].endpoints[1],
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
