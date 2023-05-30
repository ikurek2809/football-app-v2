interface Window {
  __REACT_QUERY_STATE__: string;
  __REACT_I18N_STORE__: import("i18next").Resource;
  __REACT_I18N_LANGUAGE__: string;
}

interface String {
  at: (index: number) => string;
}

declare module "*.svg" {
  import { ComponentType, SVGAttributes } from "react";

  const src: string;
  export const ReactComponent: ComponentType<SVGAttributes>;
  export default src;
}

declare module "*.jpg" {
  import { ComponentType } from "react";

  const src: string;
  export const ReactComponent: ComponentType;
  export default src;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.mp3" {
  import { ComponentType } from "react";

  const src: string;
  export const ReactComponent: ComponentType;
  export default src;
}
