import { motion } from 'framer-motion';
import { categories } from '@/data/products';
import { CategoryCard } from '@/components/products/CategoryCard';

export function CategoriesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            EXPLORA NUESTRAS <span className="text-gradient-orange">CATEGORÍAS</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Encuentra todo lo que necesitas para personalizar y mejorar tu vehículo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
