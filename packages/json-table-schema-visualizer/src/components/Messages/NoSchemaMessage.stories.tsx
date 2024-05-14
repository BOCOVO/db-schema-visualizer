import { type StoryObj, type Meta } from "@storybook/react";

import NoSchemaMessage from "./NoSchemaMessage";

const meta = {
  title: "components/Messages/NoSchemaMessage",
  component: NoSchemaMessage,
} satisfies Meta<typeof NoSchemaMessage>;

export default meta;

type Story = StoryObj<typeof NoSchemaMessage>;

export const NoSchemaMessageStory: Story = {
  render: () => <NoSchemaMessage />,
};
