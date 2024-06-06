import type { ReactNode } from "react";

export default function LayoutCreation({ children }: { children: ReactNode }) {
  return <div className="mt-3">{children}</div>;
}
