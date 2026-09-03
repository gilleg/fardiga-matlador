import type { LucideIcon } from "lucide-react";
import { Utensils, Clock, ShoppingCart } from "lucide-react";

const icons: LucideIcon[] = [Utensils, Clock, ShoppingCart];

export function SectionIcon({ index }: { index: number }) {
  const Icon = icons[index % icons.length];
  return <figure className="article-section-illustration" aria-hidden="true"><Icon strokeWidth={1.15} /></figure>;
}
