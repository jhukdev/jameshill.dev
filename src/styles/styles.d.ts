/* -----------------------------------
 *
 * Style
 *
 * -------------------------------- */

declare module '*.scss' {
  interface IStyle {
    [className: string]: string;
  }

  const style: IStyle;

  export { IStyle };
  export default style;
}
