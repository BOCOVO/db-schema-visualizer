import ThemeToggler from "./ThemeToggler";

import type { Meta, StoryObj } from "@storybook/react";

import { Theme } from "@/types/theme";

const meta: Meta = {
  component: ThemeToggler,
  title: "components/Toolbar/ThemeToggler",
};

export default meta;

type Story = StoryObj<typeof ThemeToggler>;

export const ThemeTogglerStory: Story = {
  render: () => (
    <div>
      <ThemeToggler />
    </div>
  ),
  args: { theme: Theme.dark },
};
