import { Category } from "@/types/tool";
import { getDynamicCategories } from "@/lib/category-data";
import Link from "next/link";

interface CategoryFilterProps {
  activeCategory: Category;
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const dynamicCategories = getDynamicCategories();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* All categories in a clean, centered grid */}
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-2">
          {dynamicCategories.map((category) => {
            const href = category.id === 'all' ? '/' : `/category/${category.id}`;
            return (
              <Link
                key={category.id}
                href={href}
                className={`flex-none w-[calc(50%-8px)] sm:w-[calc(33.33%-8px)] md:w-[calc(20%-8px)] lg:w-[calc(12.5%-8px)] px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border text-center active:scale-95 hover:scale-[1.02] ${
                  activeCategory === category.id
                    ? "bg-accent border-accent text-white shadow-lg shadow-accent/20"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                {category.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

