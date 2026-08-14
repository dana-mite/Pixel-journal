import { ReactNode } from "react";

// Define the blueprint for our props
interface CardProps {
  title: ReactNode;
  children: ReactNode;
}

function Card({ title, children }: CardProps) {
  return (
    <div className="pixel-card">
      <div
        className="card-header"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <span>✦</span>
        {title}
      </div>
      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;
