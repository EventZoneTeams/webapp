interface Color {
  name: string;
  backgroundColorClassName: string;
  textColorClassName: string;
}

export const colors: Color[] = [
  {
    name: "border",
    backgroundColorClassName: "bg-border",
    textColorClassName: "text-forceground",
  },
  {
    name: "input",
    backgroundColorClassName: "bg-input",
    textColorClassName: "text-forceground",
  },
  {
    name: "ring",
    backgroundColorClassName: "bg-ring",
    textColorClassName: "text-white",
  },
  {
    name: "background",
    backgroundColorClassName: "bg-background",
    textColorClassName: "text-forground",
  },
  {
    name: "foreground",
    backgroundColorClassName: "bg-foreground",
    textColorClassName: "text-background",
  },
  {
    name: "primary",
    backgroundColorClassName: "bg-primary",
    textColorClassName: "text-primary-foreground",
  },
  {
    name: "secondary",
    backgroundColorClassName: "bg-secondary",
    textColorClassName: "text-secondary-foreground",
  },
  {
    name: "destructive",
    backgroundColorClassName: "bg-destructive",
    textColorClassName: "text-destructive-foreground",
  },
  {
    name: "muted",
    backgroundColorClassName: "bg-muted",
    textColorClassName: "text-muted-foreground",
  },
  {
    name: "accent",
    backgroundColorClassName: "bg-accent",
    textColorClassName: "text-accent-foreground",
  },
  {
    name: "popover",
    backgroundColorClassName: "bg-popover",
    textColorClassName: "text-popover-foreground",
  },
  {
    name: "card",
    backgroundColorClassName: "bg-card",
    textColorClassName: "text-card-foreground",
  },
  {
    name: "success",
    backgroundColorClassName: "bg-success",
    textColorClassName: "text-success-foreground",
  },
  {
    name: "warning",
    backgroundColorClassName: "bg-warning",
    textColorClassName: "text-warning-foreground",
  },
  {
    name: "error",
    backgroundColorClassName: "bg-error",
    textColorClassName: "text-error-foreground",
  },
  {
    name: "info",
    backgroundColorClassName: "bg-info",
    textColorClassName: "text-info-foreground",
  },
];
