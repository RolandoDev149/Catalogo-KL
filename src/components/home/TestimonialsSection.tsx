import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    vehicle: 'Toyota Hilux 2022',
    rating: 5,
    text: 'Excelente calidad en los productos. Instalé la barra LED y el bull bar, quedó espectacular. El servicio post-venta es de primera.',
    avatar: 'CM',
  },
  {
    id: 2,
    name: 'María Fernández',
    vehicle: 'Jeep Wrangler 2021',
    rating: 5,
    text: 'Las alfombras premium son increíbles, protegen perfecto del barro y son muy fáciles de limpiar. Envío rápido y bien embalado.',
    avatar: 'MF',
  },
  {
    id: 3,
    name: 'Roberto Sánchez',
    vehicle: 'Ford Ranger 2023',
    rating: 5,
    text: 'El sistema de sonido que compré supera mis expectativas. La asesoría que me dieron fue clave para elegir el producto correcto.',
    avatar: 'RS',
  },
];

export function TestimonialsSection() {
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
            LO QUE DICEN <span className="text-gradient-orange">NUESTROS CLIENTES</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Miles de entusiastas confían en nosotros para equipar sus vehículos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative p-6 rounded-xl bg-card border border-border shadow-card"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full orange-gradient flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.vehicle}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
