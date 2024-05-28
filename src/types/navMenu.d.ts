export type MenuItem = {
  title: string;
  href?: string;
  children?: MenuItem[];
  description?: string;
  icon?: React.ReactNode;
};
