import Table from "./Table";

import type { Meta, StoryObj } from "@storybook/react";

import { exampleData } from "@/fake/fakeJsonTables";
import MainProviders from "@/providers/MainProviders";

const meta: Meta = {
  component: Table,
  title: "components/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const TableStory: Story = {
  render: (props) => (
    <MainProviders enums={exampleData.enums} tables={exampleData.tables}>
      <Table {...props} />
    </MainProviders>
  ),
  args: {
    ...exampleData.tables[0],
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
