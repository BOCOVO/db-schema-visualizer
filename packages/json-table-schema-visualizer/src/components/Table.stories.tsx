import Table from "./Table";

import type { Meta, StoryObj } from "@storybook/react";

import { exampleData } from "@/fake/fakeJsonTables";
import MainProviders from "@/providers/MainProviders";
import TablesPositionsProvider from "@/providers/TablesPositionsProvider";

const meta: Meta = {
  component: Table,
  title: "components/Table",
};

export default meta;

type Story = StoryObj<typeof Table>;

export const TableStory: Story = {
  render: (props) => (
    <TablesPositionsProvider tables={[]}>
      <MainProviders enums={exampleData.enums} tables={exampleData.tables}>
        <Table {...props} />
      </MainProviders>
    </TablesPositionsProvider>
  ),
  args: {
    ...exampleData.tables[0],
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
