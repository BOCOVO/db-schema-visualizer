import { type Meta, type StoryObj } from "@storybook/react";

import Toolbar from "./Toolbar";

import TablesPositionsProvider from "@/providers/TablesPositionsProvider";

const meta: Meta = {
  component: Toolbar,
  title: "components/Toolbar",
};

export default meta;

type Story = StoryObj<typeof Toolbar>;

export const ToolbarStory: Story = {
  render: () => <Toolbar />,
  decorators: [
    (Story) => (
      <div className="py-32">
        <TablesPositionsProvider tables={[]}>
          <Story />
        </TablesPositionsProvider>
      </div>
    ),
  ],
};
