import type { ICustomButton } from '@/components/atoms/CustomButton/CustomButton.type';

interface IExpansionCustomButton extends ICustomButton {
  default?: boolean;
  visible?: boolean;
  action?: () => void;
}

interface IButtonGroup {
  buttons: IExpansionCustomButton[];
}

export type { IButtonGroup, IExpansionCustomButton };
