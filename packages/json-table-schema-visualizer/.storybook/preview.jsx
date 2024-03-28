import React from "react";
import { Layer, Stage } from "react-konva";
import { defaultThemeConfig } from "../src/constants/theme";
import ThemeProvider from "../src/providers/ThemeProvider";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, configs) =>
      configs.parameters.withKonvaWrapper ? (
        <ThemeProvider theme={defaultThemeConfig}>
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Story />
            </Layer>
          </Stage>
        </ThemeProvider>
      ) : (
        <Story />
      ),
  ],
};

export default preview;
