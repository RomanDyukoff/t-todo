interface ICustomButton {
  label: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  color?: 'prime' | 'transparent';
}

export type { ICustomButton };
