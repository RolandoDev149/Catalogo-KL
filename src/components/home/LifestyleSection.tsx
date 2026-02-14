import { motion } from 'framer-motion';
import lifestyleImage from '@/assets/lifestyle-hero.jpg';

export function LifestyleSection() {
  return (
    <section className="py-20 bg-card overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl mb-6">
              TU VEHÍCULO ES MÁS QUE <span className="text-gradient-orange">TRANSPORTE</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Es tu herramienta, tu pasión y tu estilo. Cada modificación cuenta una historia, cada accesorio refleja tu personalidad.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              En AutoParts entendemos que tu vehículo es una extensión de ti mismo. Por eso ofrecemos solo productos de la más alta calidad, diseñados para quienes no se conforman con lo básico.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-display text-4xl text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Clientes felices</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Productos</div>
              </div>
              <div className="text-center">
                <div className="font-display text-4xl text-primary mb-1">15</div>
                <div className="text-sm text-muted-foreground">Años experiencia</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={lifestyleImage}
                alt="Estilo de vida automotriz"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl orange-gradient opacity-20 blur-2xl" />
            <div className="absolute -top-6 -right-6 w-40 h-40 rounded-xl orange-gradient opacity-20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
