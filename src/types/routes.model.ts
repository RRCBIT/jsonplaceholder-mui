import { ComponentType } from "react";

export interface RouteModel {
  exact: boolean;
  path: string;
  component: ComponentType;
}

export interface IParams {
  id: string;
}
