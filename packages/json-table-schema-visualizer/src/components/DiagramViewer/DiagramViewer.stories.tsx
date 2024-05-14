import DiagramViewer from "./DiagramViewer";

import type { Meta, StoryObj } from "@storybook/react";

import { createBookingsTableClone, exampleData } from "@/fake/fakeJsonTables";
import { tableCoordsStore } from "@/stores/tableCoords";

const meta: Meta<typeof DiagramViewer> = {
  component: DiagramViewer,
  title: "components/DiagramViewer",
};

export default meta;

type Story = StoryObj<typeof DiagramViewer>;

const tables = [
  ...exampleData.tables,
  createBookingsTableClone("1"),
  createBookingsTableClone("2"),
  createBookingsTableClone("3"),
  createBookingsTableClone("4"),
  createBookingsTableClone("5"),
  createBookingsTableClone("6"),
];

export const DiagramViewerStory: Story = {
  render: (props) => <DiagramViewer {...props} />,
  args: {
    tables,
    enums: exampleData.enums,
    refs: exampleData.refs,
  },
  decorators: [
    (Story) => {
      tableCoordsStore.resetPositions(tables);

      return <Story />;
    },
  ],
};
