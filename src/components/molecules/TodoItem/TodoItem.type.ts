interface ITodoItem {
  id: string;
  content: string;
  checked: boolean;
  order_index?: number;
}

export type { ITodoItem };
