import { type StoryObj, type Meta } from "@storybook/react";

import EmptyTableMessage from "./EmptyTableMessage";

const meta = {
  title: "components/Messages/EmptyTableMessage",
  component: EmptyTableMessage,
} satisfies Meta<typeof EmptyTableMessage>;

export default meta;

type Story = StoryObj<typeof EmptyTableMessage>;

export const EmptyTableMessageStory: Story = {
  render: () => <EmptyTableMessage />,
};
