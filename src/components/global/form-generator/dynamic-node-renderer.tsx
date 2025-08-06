/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import Switch from "@/components/global/input/switch";
import { Button } from "@/components/ui/button";
import { DynamicNode } from "@/types/form-generator";

interface DynamicNodeRendererProps {
  node: DynamicNode;
  formData: any;
  setValue: any;
}

export const DynamicNodeRenderer: React.FC<DynamicNodeRendererProps> = ({
  node,
  formData,
  setValue,
}) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (node.onClick) {
      node.onClick(formData, setValue);
    }
  };

  switch (node.type) {
    case "button":
      return (
        <Button type="button" size="sm" onClick={handleClick} {...node.props}>
          {node.props?.children || "Action"}
        </Button>
      );

    case "switch":
      return (
        <Switch
          checked={node.props?.checked || false}
          onCheckedChange={(checked) => {
            if (node.onClick) {
              node.onClick(
                { ...formData, [node.props?.name || "switch"]: checked },
                setValue
              );
            }
          }}
          checkedTitle={node.props?.checkedTitle}
          uncheckedTitle={node.props?.uncheckedTitle}
          {...node.props}
        />
      );

    case "icon": {
      const IconComponent = node.props?.icon;
      return IconComponent ? (
        <IconComponent
          className="cursor-pointer"
          onClick={handleClick}
          {...node.props}
        />
      ) : null;
    }

    case "custom":
      return node.render ? node.render(formData, setValue) : null;

    default:
      return null;
  }
};
