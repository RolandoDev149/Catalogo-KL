import { motion } from 'framer-motion';
import { Wrench, Shield, Truck, Headphones, CreditCard } from 'lucide-react';

const benefits = [
  {
    icon: Wrench,
    title: 'Instalación Profesional',
    description: 'Técnicos certificados para cada producto',
  },
  {
    icon: Shield,
    title: 'Productos Garantizados',
    description: 'Garantía directa en todos los artículos',
  },
  {
    icon: Truck,
    title: 'Envíos Rápidos',
    description: 'Despacho a todo Chile en 24-72 horas',
  },
  {
    icon: Headphones,
    title: 'Atención Personalizada',
    description: 'Asesoría experta antes y después de tu compra',
  },
  {
    icon: CreditCard,
    title: 'Pagos Seguros',
    description: 'Múltiples métodos de pago protegidos',
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl orange-gradient mb-4">
                <benefit.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
