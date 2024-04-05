import Table from "../Table";

import RelationConnection from "./RelationConnection";

import type { Meta, StoryObj } from "@storybook/react";

import { exampleData } from "@/fake/fakeJsonTables";
import MainProviders from "@/providers/MainProviders";

const meta: Meta = {
  component: RelationConnection,
  title: "components/RelationConnection",
};

export default meta;

type Story = StoryObj<typeof RelationConnection>;

export const RelationConnectionStory: Story = {
  render: (props) => (
    <MainProviders enums={exampleData.enums} tables={exampleData.tables}>
      <RelationConnection {...props} />

      <Table {...exampleData.tables[0]} />

      <Table {...exampleData.tables[1]} />

      <Table {...exampleData.tables[2]} />
    </MainProviders>
  ),
  args: {
    source: exampleData.refs[0].endpoints[0],
    target: exampleData.refs[0].endpoints[1],
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
