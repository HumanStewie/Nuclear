import type { ReactNode } from "react";

interface Props {
  children: string;
  color?: ReactNode;
  onClick: () => void;
}

const Button = ({ color = "danger" }: Props) => {
  return (
    <div className="text-center btn" id="ontop">
      <button type="button" className={"btn btn-" + color}>
        Bello
      </button>
    </div>
  );
};

export default Button;
