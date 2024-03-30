import Column from "./Column";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Column> = {
  component: Column,
  title: "components/Column",
};

export default meta;

type Story = StoryObj<typeof Column>;

export const ColumnStory: Story = {
  args: {
    colName: "username",
    type: "varchar",
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
