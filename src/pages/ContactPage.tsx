import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Dirección',
    details: 'Carretera interamericana al lado del antiguo v8, Santiago, Veraguas, Panamá',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    details: '+507 6909 3601',
    href: 'tel:+50769093601',
  },
  {
    icon: Mail,
    title: 'Email',
    details: 'ventas@autoparts.cl',
    href: 'mailto:ventas@autoparts.cl',
  },
  {
    icon: Clock,
    title: 'Horario',
    details: 'Lun - Dom: 8:00 AM - 6:00 PM',
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('¡Mensaje enviado! Te contactaremos pronto.');
    setFormData({ name: '', email: '', phone: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              <span className="text-gradient-orange">CONTÁCTANOS</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y te responderemos lo antes posible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-8 rounded-xl bg-card border border-border">
                <h2 className="font-display text-2xl mb-6">ENVÍANOS UN MENSAJE</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      required
                      className="mt-1.5 bg-background"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="tu@email.com"
                        required
                        className="mt-1.5 bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+507 69093601"
                        className="mt-1.5 bg-background"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="¿En qué podemos ayudarte?"
                      rows={5}
                      required
                      className="mt-1.5 bg-background resize-none"
                    />
                  </div>
                  <Button type="submit" variant="addToCart" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : (
                      <>
                        <Send className="h-4 w-4" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="p-6 rounded-xl bg-card border border-border"
                  >
                    <info.icon className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.details}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="p-6 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">¿Prefieres WhatsApp?</h3>
                    <p className="text-sm text-muted-foreground">Respuesta inmediata</p>
                  </div>
                  <Button variant="whatsapp" asChild>
                    <a
                      href="https://wa.me/50769093601?text=Hola! Tengo una consulta."
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Chatear ahora
                    </a>
                  </Button>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="aspect-video rounded-xl bg-card border border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.4604841635812!2d-80.97599149999999!3d8.1175713!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fae73b10ad9485b%3A0xabccdb4fab52e757!2sKL%20Electronic!5e0!3m2!1ses!2spa!4v1771266136586!5m2!1ses!2spa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Kl Electronic"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      
    </div>
  );
}
