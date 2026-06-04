import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl tracking-wider text-foreground">
                KL<span className="text-gradient-orange">Electronics</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Los mejores accesorios para tu vehículo. Calidad premium, instalación profesional y garantía en todos nuestros productos.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/kl_electronic__caraudio?igsh=dnVxeTdydDBjMWZh" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">TIENDA</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tienda?category=4x4" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accesorios 4x4
                </Link>
              </li>
              <li>
                <Link to="/tienda?category=audio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Equipos de Sonido
                </Link>
              </li>
              <li>
                <Link to="/tienda?category=led" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Luces LED
                </Link>
              </li>
              <li>
                <Link to="/tienda?category=racks" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Racks de Techo
                </Link>
              </li>
              <li>
                <Link to="/tienda?category=interior" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Confort Interior
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">INFORMACIÓN</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg mb-4 text-foreground">CONTACTO</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span>Carretera interamericana,frente a harineria oro del norte, Santiago, Veraguas, Panama</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+507 6909-3601" className="hover:text-primary transition-colors">
                  +507 6909-3601
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:ventas@autoparts.cl" className="hover:text-primary transition-colors">
                  ventas@autoparts.cl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Rolando Garcia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <img src="/placeholder.svg" alt="Visa" className="h-8 opacity-50" />
            <img src="/placeholder.svg" alt="Mastercard" className="h-8 opacity-50" />
            <img src="/placeholder.svg" alt="WebPay" className="h-8 opacity-50" />
          </div>
        </div>
      </div>
    </footer>
  );
}
