import FieldDetailWrapper from "./FieldDetailWrapper";
import FieldDetails from "./FieldDetails";

import type { Meta, StoryObj } from "@storybook/react";

import EnumsProvider from "@/providers/EnumsProvider";
import { exampleData } from "@/fake/fakeJsonTables";

const meta: Meta = {
  component: FieldDetailWrapper,
  title: "components/FieldDetailWrapper",
};

export default meta;

type Story = StoryObj<typeof FieldDetailWrapper>;

export const FieldDetailWrapperStory: Story = {
  render: (props) => <FieldDetailWrapper {...props} />,
  args: {
    children: (
      <EnumsProvider enums={exampleData.enums}>
        <FieldDetails
          note="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          enumName="status"
        />
      </EnumsProvider>
    ),
  },
  parameters: {
    withKonvaWrapper: true,
  },
};
