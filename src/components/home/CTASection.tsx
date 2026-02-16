import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  const whatsappUrl = 'https://wa.me/50769093601?text=Hola! Estoy listo para transformar mi vehículo.';

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full orange-gradient opacity-10 blur-3xl" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            ¿LISTO PARA <span className="text-gradient-orange">TRANSFORMAR</span> TU AUTO?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Descubre nuestra colección completa de accesorios premium y lleva tu vehículo al siguiente nivel.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <Link to="/tienda">
                Comprar ahora
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="whatsapp" size="xl" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Hablar por WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
