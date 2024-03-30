import type { Meta, StoryObj } from "@storybook/react";
import TableHeader from "./TableHeader";

const meta: Meta = {
  component: TableHeader,
  title: "components/TableHeader",
};

export default meta;

type Story = StoryObj<typeof TableHeader>;

export const TableHeaderStory: Story = {
  render: (props) => <TableHeader {...props} />,
  args: {
    title: "users",
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
