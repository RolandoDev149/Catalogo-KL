import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Truck, Shield, Wrench, CreditCard, RotateCcw, HelpCircle } from 'lucide-react';

const faqCategories = [
  {
    icon: Truck,
    title: 'Envíos',
    faqs: [
      {
        question: '¿Cuánto demora el envío?',
        answer: 'Los envíos dentro de Santiago demoran 24-48 horas. Para el resto del país, el tiempo estimado es de 2-4 días hábiles dependiendo de la ubicación.',
      },
      {
        question: '¿El envío tiene costo?',
        answer: 'El envío es GRATIS en compras sobre $100. Para compras menores, el costo de envío es de $5 a todo Panamá.',
      },
      {
        question: '¿Hacen envíos a todo Panamá?',
        answer: 'Sí, realizamos envíos a todo Panamá a través de empresas de encomienda y mensajería. Tú eliges el courier de tu preferencia.',
      },
      {
        question: '¿Puedo retirar en tienda?',
        answer: 'Sí, puedes retirar tu pedido en nuestra tienda ubicada en la Carretera Interamericana, Santiago, Veraguas. El retiro es gratuito y está disponible de lunes a sábado.',
      },
    ],
  },
  {
    icon: Shield,
    title: 'Garantía',
    faqs: [
      {
        question: '¿Los productos tienen garantía?',
        answer: 'Todos nuestros productos tienen garantía mínima de 6 meses contra defectos de fabricación. Algunos productos premium tienen garantía extendida de hasta 2 años.',
      },
      {
        question: '¿Cómo hago efectiva la garantía?',
        answer: 'Para hacer efectiva tu garantía, contáctanos por WhatsApp o email con tu número de pedido y fotos del producto. Evaluaremos el caso y te daremos una solución en 48 horas.',
      },
      {
        question: '¿Qué cubre la garantía?',
        answer: 'La garantía cubre defectos de fabricación y mal funcionamiento. No cubre daños por instalación incorrecta, mal uso o desgaste normal.',
      },
    ],
  },
  {
    icon: Wrench,
    title: 'Instalación',
    faqs: [
      {
        question: '¿Ofrecen servicio de instalación?',
        answer: 'Sí, contamos con servicio de instalación profesional en nuestra tienda. El costo varía según el producto y la complejidad de la instalación.',
      },
      {
        question: '¿Puedo instalar los productos yo mismo?',
        answer: 'Muchos de nuestros productos vienen con instrucciones detalladas para instalación DIY. Sin embargo, para productos complejos como barras LED o sistemas de audio, recomendamos instalación profesional.',
      },
      {
        question: '¿Los productos vienen con kit de instalación?',
        answer: 'La mayoría de nuestros productos incluyen el kit de instalación necesario. En la descripción de cada producto especificamos qué incluye.',
      },
    ],
  },
  {
    icon: CreditCard,
    title: 'Pagos',
    faqs: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos transferencia bancaria, tarjetas de crédito y débito (Visa, Mastercard), Yappy, y pago en efectivo en tienda.',
      },
      {
        question: '¿Puedo pagar en cuotas?',
        answer: 'Sí, puedes pagar en cuotas con tu tarjeta de crédito BAC Credomatic y también a través de Krediya.',
      },
      {
        question: '¿Es seguro comprar en la tienda?',
        answer: 'Absolutamente. Nuestra tienda cuenta con certificado SSL y procesamos los pagos a través de plataformas seguras certificadas.',
      },
    ],
  },
  {
    icon: RotateCcw,
    title: 'Devoluciones',
    faqs: [
      {
        question: '¿Puedo devolver un producto?',
        answer: 'Tienes 10 días desde la recepción para solicitar una devolución si el producto no cumple tus expectativas. El producto debe estar sin uso y en su empaque original.',
      },
      {
        question: '¿Cómo solicito una devolución?',
        answer: 'Contáctanos por WhatsApp o email con tu número de pedido. Te indicaremos el proceso y coordinaremos el retiro del producto.',
      },
      {
        question: '¿Cuánto demora el reembolso?',
        answer: 'Una vez recibido y verificado el producto, procesamos el reembolso en un plazo de 5 días hábiles al mismo medio de pago original.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-display text-5xl md:text-6xl mb-4">
              PREGUNTAS <span className="text-gradient-orange">FRECUENTES</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Encuentra respuestas a las dudas más comunes
            </p>
          </motion.div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg orange-gradient flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h2 className="font-display text-2xl">{category.title.toUpperCase()}</h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`${category.title}-${faqIndex}`}>
                      <AccordionTrigger className="text-left hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 p-8 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 text-center"
          >
            <h3 className="font-display text-2xl mb-2">¿NO ENCONTRASTE LO QUE BUSCABAS?</h3>
            <p className="text-muted-foreground mb-6">
              Contáctanos y te ayudamos personalmente
            </p>
            <a
              href="https://wa.me/50769093601?text=Hola! Tengo una pregunta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:bg-[#20BD5A] transition-colors"
            >
              Chatear por WhatsApp
            </a>
          </motion.div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      
    </div>
  );
}
