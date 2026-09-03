import type { LucideIcon } from "lucide-react";
import { Utensils, Clock, ShoppingCart } from "lucide-react";

const icons: LucideIcon[] = [Utensils, Clock, ShoppingCart];

export function SectionIcon({ index }: { index: number }) {
  const Icon = icons[index % icons.length];
  return <span className="section-line-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>;
}
