import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Star, ChevronLeft, Check, Truck } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-20 text-center">
          <h1 className="font-display text-4xl mb-4">PRODUCTO NO ENCONTRADO</h1>
          <Button asChild>
            <Link to="/tienda">Volver al catálogo</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const whatsappUrl = `https://wa.me/69093601?text=${encodeURIComponent(`Hola! Me interesa el producto: ${product.name} - ${formatPrice(product.price)}`)}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <Link to="/tienda" className="hover:text-primary transition-colors">Catálogo</Link>
            <ChevronLeft className="h-4 w-4 rotate-180" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product section */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Image gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-card border border-border">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden bg-card border border-border cursor-pointer hover:border-primary transition-colors"
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Product info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Badges */}
              <div className="flex gap-2">
                {product.isNew && (
                  <Badge className="orange-gradient border-0">NUEVO</Badge>
                )}
                {product.isOnSale && (
                  <Badge variant="destructive">OFERTA</Badge>
                )}
                {product.inStock ? (
                  <Badge variant="outline" className="border-green-500 text-green-500">Disponible</Badge>
                ) : (
                  <Badge variant="outline" className="border-red-500 text-red-500">No disponible</Badge>
                )}
              </div>

              {/* Title & brand */}
              <div>
                <p className="text-primary text-sm font-medium mb-2">{product.brand}</p>
                <h1 className="font-display text-3xl md:text-4xl">{product.name.toUpperCase()}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : 'fill-muted text-muted'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviewCount} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <Badge variant="destructive">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              {/* Short description */}
              <p className="text-lg text-muted-foreground">{product.shortDescription}</p>

              {/* WhatsApp button */}
              <Button variant="whatsapp" size="lg" className="w-full" asChild>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  Consultar por WhatsApp
                </a>
              </Button>

              {/* Shipping info */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Consulta disponibilidad y opciones de envío
                </span>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-display text-lg mb-3">CARACTERÍSTICAS</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vehicle compatibility */}
              <div>
                <h3 className="font-display text-lg mb-3">COMPATIBLE CON</h3>
                <div className="flex flex-wrap gap-2">
                  {product.vehicleTypes.map((type) => (
                    <Badge key={type} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <div className="mb-20">
            <h2 className="font-display text-2xl mb-4">DESCRIPCIÓN</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {product.description}
            </p>
          </div>

          {/* Related products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-display text-2xl md:text-3xl mb-8">
                PRODUCTOS <span className="text-gradient-orange">RELACIONADOS</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
