type ISource = { srcset: string; media: string };

interface ICustomImage {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  loading?: 'lazy' | 'eager';
  sizes?: ISource[];
}

export type { ICustomImage, ISource };
