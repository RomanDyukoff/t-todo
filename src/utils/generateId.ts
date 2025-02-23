import { v4 as uuidv4 } from 'uuid';

function generateId(): string {
  return uuidv4();
}

export { generateId };
