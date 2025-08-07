"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checkedTitle?: string;
  uncheckedTitle?: string;
  titleClassName?: string;
  thumbClassName?: string;
  checkedTitleClassName?: string;
  uncheckedTitleClassName?: string;
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(
  (
    {
      className,
      checkedTitle,
      uncheckedTitle,
      titleClassName,
      thumbClassName,
      checkedTitleClassName,
      uncheckedTitleClassName,
      checked = false,
      ...props
    },
    ref
  ) => {
    const switchRef = React.useRef<HTMLButtonElement>(null);
    const [thumbTransform, setThumbTransform] =
      React.useState("translateX(0px)");

    const hasTitle = checkedTitle || uncheckedTitle;

    React.useEffect(() => {
      if (!hasTitle || !switchRef.current) return;

      const switchElement = switchRef.current;
      const switchWidth = switchElement.offsetWidth;
      const thumbWidth = 27;

      if (checked) {
        setThumbTransform(`translateX(${switchWidth - thumbWidth - 2}px)`);
      } else {
        setThumbTransform("translateX(0px)");
      }
    }, [checked, hasTitle, checkedTitle, uncheckedTitle]);

    React.useEffect(() => {
      if (!hasTitle || !switchRef.current) return;

      const switchElement = switchRef.current;
      const resizeObserver = new ResizeObserver(() => {
        const switchWidth = switchElement.offsetWidth;
        const thumbWidth = 27;

        if (checked) {
          setThumbTransform(`translateX(${switchWidth - thumbWidth - 2}px)`);
        } else {
          setThumbTransform("translateX(0px)");
        }
      });

      resizeObserver.observe(switchElement);

      return () => {
        resizeObserver.disconnect();
      };
    }, [checked, hasTitle, checkedTitle, uncheckedTitle]);

    if (!hasTitle) {
      return (
        <SwitchPrimitives.Root
          checked={checked}
          className={cn(
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800",
            "disabled:!bg-black-20",
            className
          )}
          {...props}
          ref={ref}
        >
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-slate-950",
              thumbClassName
            )}
          />
        </SwitchPrimitives.Root>
      );
    }

    return (
      <SwitchPrimitives.Root
        className={cn(
          "inline-flex shrink-0",
          "relative cursor-pointer items-center transition-colors rounded-full disabled:cursor-not-allowed h-[29px] border !border-secondary-20 data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary disabled:!bg-black-20 disabled:!border overflow-hidden flex-center w-fit",
          className
        )}
        {...props}
        checked={checked}
        ref={(node) => {
          switchRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
      >
        {checkedTitle && checked && (
          <span
            className={cn(
              "flex-center select-none pointer-events-none transition-opacity duration-200 text-white body-3 mr-[30px] ml-[8px]",
              checked ? "opacity-100 " : "opacity-0 hidden",
              titleClassName,
              checkedTitleClassName
            )}
          >
            {checkedTitle}
          </span>
        )}

        <SwitchPrimitives.Thumb
          className={cn(
            "absolute z-10 pointer-events-none block rounded-full bg-white ring-0 transition-transform duration-200 size-[27px] min-h-[27px] min-w-[27px]",
            "data-[state=checked]:shadow-switchChecked data-[state=unchecked]:shadow-switchUnchecked",
            "left-0",
            thumbClassName
          )}
          style={{
            transform: thumbTransform,
          }}
        />

        {uncheckedTitle && !checked && (
          <span
            className={cn(
              "flex-center select-none pointer-events-none transition-opacity duration-200 text-white body-3 ml-[30px] mr-[8px]",
              checked ? "opacity-0 hidden" : "opacity-100",
              titleClassName,
              uncheckedTitleClassName
            )}
          >
            {uncheckedTitle}
          </span>
        )}
      </SwitchPrimitives.Root>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
