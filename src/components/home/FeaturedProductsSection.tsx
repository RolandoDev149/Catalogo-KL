import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { ProductCard } from '@/components/products/ProductCard';

export function FeaturedProductsSection() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl mb-2">
              PRODUCTOS <span className="text-gradient-orange">DESTACADOS</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Los favoritos de nuestros clientes
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tienda">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
