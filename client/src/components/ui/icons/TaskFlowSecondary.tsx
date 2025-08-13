import type { FC } from "react";

type TaskflowSecondaryProps = React.ComponentProps<"svg">;

export const TaskflowSecondary: FC<TaskflowSecondaryProps> = ({
  width,
  height,
  ...props
}) => {
  const componentProps = props;
  return (
    <svg
      width={width}
      height={height}
      {...componentProps}
      viewBox="0 0 32 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 10H2C0.89543 10 0 10.8954 0 12V28C0 29.1046 0.89543 30 2 30H6C7.10457 30 8 29.1046 8 28V12C8 10.8954 7.10457 10 6 10Z"
        fill="#3B82F6"
      />
      <path
        d="M18 6H14C12.8954 6 12 6.89543 12 8V32C12 33.1046 12.8954 34 14 34H18C19.1046 34 20 33.1046 20 32V8C20 6.89543 19.1046 6 18 6Z"
        fill="#60A5FA"
      />
      <path
        d="M30 14H26C24.8954 14 24 14.8954 24 16V24C24 25.1046 24.8954 26 26 26H30C31.1046 26 32 25.1046 32 24V16C32 14.8954 31.1046 14 30 14Z"
        fill="#93C5FD"
      />
    </svg>
  );
};
