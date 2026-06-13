declare module "@base-ui/react/avatar" {
  export const Avatar: any;
  export namespace Avatar {
    export namespace Root { export type Props = any; }
    export namespace Image { export type Props = any; }
    export namespace Fallback { export type Props = any; }
  }
}

declare module "@base-ui/react/button" {
  export const Button: any;
  export namespace Button { export type Props = any; }
}

declare module "@base-ui/react/checkbox" {
  export const Checkbox: any;
  export namespace Checkbox {
    export namespace Root { export type Props = any; }
    export namespace Indicator { export type Props = any; }
    export namespace Input { export type Props = any; }
  }
}

declare module "@base-ui/react/dialog" {
  export const Dialog: any;
  export namespace Dialog {
    export namespace Root { export type Props = any; }
    export namespace Trigger { export type Props = any; }
    export namespace Close { export type Props = any; }
    export namespace Portal { export type Props = any; }
    export namespace Backdrop { export type Props = any; }
    export namespace Popup { export type Props = any; }
    export namespace Title { export type Props = any; }
    export namespace Description { export type Props = any; }
  }
}

declare module "@base-ui/react/input" {
  export const Input: any;
  export namespace Input { export type Props = any; }
}

declare module "@base-ui/react/merge-props" {
  export function mergeProps<T = any>(...args: any[]): T;
}

declare module "@base-ui/react/progress" {
  export const Progress: any;
  export namespace Progress {
    export namespace Root { export type Props = any; }
    export namespace Track { export type Props = any; }
    export namespace Indicator { export type Props = any; }
    export namespace Label { export type Props = any; }
    export namespace Value { export type Props = any; }
  }
}

declare module "@base-ui/react/separator" {
  export const Separator: any;
  export namespace Separator { export type Props = any; }
}

declare module "@base-ui/react/tabs" {
  export const Tabs: any;
  export namespace Tabs {
    export namespace Root { export type Props = any; }
    export namespace List { export type Props = any; }
    export namespace Tab { export type Props = any; }
    export namespace Panel { export type Props = any; }
  }
}

declare module "@base-ui/react/tooltip" {
  export const Tooltip: any;
  export namespace Tooltip {
    export namespace Provider { export type Props = any; }
    export namespace Root { export type Props = any; }
    export namespace Trigger { export type Props = any; }
    export namespace Popup { export type Props = any; }
    export namespace Positioner { export type Props = any; }
  }
}

declare module "@base-ui/react/use-render" {
  export namespace useRender {
    export type ComponentProps<
      T extends keyof import("react").JSX.IntrinsicElements,
    > = import("react").ComponentProps<T> & {
        render?: any;
      };
  }

  export function useRender(...args: any[]): any;
}
