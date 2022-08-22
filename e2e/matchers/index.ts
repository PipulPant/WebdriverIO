import { WdioElement } from 'types';
import { imageDisplayed } from '../utils';


/** Custom matcher to check the image 
 * This method checks for the image property 
 * checking the natural width
 */
export const addCustomMatchers = (): void => {
  expect.extend({
    async toBeDisplayedImage(imageElement: WdioElement) {
      const pass = await imageDisplayed(imageElement)();
      const selector = await imageElement.selector;

      return {
        message: () => `expect(${selector}).${this.isNot ? 'not.' : ''}toBeDisplayedImage()
          Expected: "${this.isNot ? 'not displayed' : 'displayed'}"
          Received: "${pass ? 'displayed' : 'not displayed'}"
        `,
        pass: pass,
      };
    },
  });
};
