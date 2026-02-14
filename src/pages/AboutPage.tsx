import { motion } from 'framer-motion';
import { Users, Award, Truck, Heart } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

import heroImage from '@/assets/hero-truck.jpg';
import lifestyleImage from '@/assets/lifestyle-hero.jpg';

const stats = [
  { icon: Users, value: '10K+', label: 'Clientes satisfechos' },
  { icon: Award, value: '15', label: 'Años de experiencia' },
  { icon: Truck, value: '50K+', label: 'Productos entregados' },
  { icon: Heart, value: '98%', label: 'Satisfacción' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0">
            <img src={heroImage} alt="AutoParts" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/50" />
          </div>
          <div className="container relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-7xl"
            >
              SOBRE <span className="text-gradient-orange">NOSOTROS</span>
            </motion.h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl mb-6">
                  NUESTRA <span className="text-gradient-orange">HISTORIA</span>
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    AutoParts nació en 2009 de la pasión por los vehículos y la necesidad de ofrecer productos de calidad premium a precios accesibles en Chile.
                  </p>
                  <p>
                    Lo que comenzó como un pequeño taller familiar se ha convertido en una de las tiendas de accesorios automotrices más reconocidas del país, con miles de clientes satisfechos.
                  </p>
                  <p>
                    Nuestro equipo está formado por entusiastas del mundo automotriz que entienden las necesidades de cada cliente, ya sea que busques equipar tu pickup para aventuras off-road o mejorar el sistema de audio de tu sedán.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src={lifestyleImage}
                  alt="Nuestro equipo"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-xl orange-gradient opacity-20 blur-2xl" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="font-display text-4xl text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-4xl mb-4">
                NUESTROS <span className="text-gradient-orange">VALORES</span>
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Calidad Premium',
                  description: 'Seleccionamos solo productos de las mejores marcas con garantía directa.',
                },
                {
                  title: 'Atención Personalizada',
                  description: 'Cada cliente es único y merece asesoría experta para encontrar el producto ideal.',
                },
                {
                  title: 'Pasión Automotriz',
                  description: 'Amamos los vehículos tanto como tú. Entendemos tus necesidades.',
                },
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-card border border-border text-center"
                >
                  <h3 className="font-display text-xl text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      
    </div>
  );
}
