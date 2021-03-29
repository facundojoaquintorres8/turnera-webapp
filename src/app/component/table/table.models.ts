import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ITable {
  headers: IHeader[];
  buttons: IButton[];
}

export interface IHeader {
  label: string;
  inputName: string;
  inputType: InputTypeEnum;
  sort: boolean;
}

export interface IButton {
  permissions: string[];
  class: string;
  title: string;
  titleWithFunction?: (param?: any) => string;
  icon: IconProp;
  disabled?: (param?: any) => boolean;
  onClickFunction: (param?: any) => {} | void;
}

export enum InputTypeEnum {
  TEXT,
  NUMBER,
  // LIST,
  BOOLEAN,
  DATE
}