import DetailLevelToggle from "./DetailLevelToggle";

import type { Meta, StoryObj } from "@storybook/react";

import TableDetailLevelProvider from "@/providers/TableDetailLevelProvider";

const meta: Meta = {
  component: DetailLevelToggle,
  title: "components/Toolbar/DetailLevelToggle",
};

export default meta;

type Story = StoryObj<typeof DetailLevelToggle>;

export const DetailLevelToggleStory: Story = {
  render: () => <DetailLevelToggle />,
  decorators: [
    (Story) => (
      <TableDetailLevelProvider>
        <Story />
      </TableDetailLevelProvider>
    ),
  ],
};
