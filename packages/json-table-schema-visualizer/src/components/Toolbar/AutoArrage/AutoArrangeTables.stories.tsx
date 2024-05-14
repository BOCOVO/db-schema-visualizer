import AutoArrangeTableButton from "./AutoArrangeTables";

import type { Meta, StoryObj } from "@storybook/react";

import TablesPositionsProvider from "@/providers/TablesPositionsProvider";

const meta: Meta = {
  component: AutoArrangeTableButton,
  title: "components/Toolbar/AutoArrangeTableButton",
};

export default meta;

type Story = StoryObj<typeof AutoArrangeTableButton>;

export const AutoArrangeTableButtonStory: Story = {
  render: () => <AutoArrangeTableButton />,
  decorators: [
    (Story) => (
      <TablesPositionsProvider tables={[]}>
        <Story />
      </TablesPositionsProvider>
    ),
  ],
};
