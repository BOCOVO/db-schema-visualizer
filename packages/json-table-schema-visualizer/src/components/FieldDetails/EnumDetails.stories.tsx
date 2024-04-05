import EnumDetails from "./EnumDetails";

import type { Meta, StoryObj } from "@storybook/react";

import EnumsProvider from "@/providers/EnumsProvider";
import { exampleData } from "@/fake/fakeJsonTables";

const meta: Meta = {
  component: EnumDetails,
  title: "components/EnumDetails",
};

export default meta;

type Story = StoryObj<typeof EnumDetails>;

export const EnumDetailsStory: Story = {
  render: (props) => (
    <EnumsProvider enums={exampleData.enums}>
      <EnumDetails {...props} />
    </EnumsProvider>
  ),
  args: {
    enumName: "status",
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
