import { SvgIconProps } from "@mui/material";
import { ReactNode } from "react";

export type OptionsMenuItem = {
  label: string;
  icon: (props?: SvgIconProps) => ReactNode;
  iconColor: { light: string; dark: string } | null;
  switchIsOn: boolean;
  switchToggleFn: () => void;
};

export type OptionsMenuItems = OptionsMenuItem[];
