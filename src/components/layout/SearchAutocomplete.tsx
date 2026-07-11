import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { searchProducts, searchCategories } from '@/lib/search';
import { formatPrice } from '@/lib/utils';

interface SearchAutocompleteProps {
  /** Se llama al navegar (ej. para cerrar el menú móvil). */
  onNavigate?: () => void;
  className?: string;
}

export function SearchAutocomplete({ onNavigate, className }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const trimmed = query.trim();
  const productResults = useMemo(() => searchProducts(query, 6), [query]);
  const categoryResults = useMemo(() => searchCategories(query, 5), [query]);
  const hasResults = productResults.length > 0 || categoryResults.length > 0;

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const go = (to: string) => {
    setOpen(false);
    setQuery('');
    onNavigate?.();
    navigate(to);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trimmed) go(`/tienda?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
            className="pl-10 bg-card border-border"
          />
        </div>
      </form>

      {open && trimmed.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-border bg-card shadow-xl overflow-hidden">
          {hasResults ? (
            <div className="max-h-[70vh] overflow-y-auto">
              {categoryResults.length > 0 && (
                <div className="p-2">
                  <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Categorías
                  </p>
                  {categoryResults.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => go(`/tienda?category=${c.slug}`)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-accent transition-colors"
                    >
                      <Tag className="h-4 w-4 flex-shrink-0 text-primary" />
                      <span className="font-medium">{c.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {productResults.length > 0 && (
                <div className={`p-2 ${categoryResults.length > 0 ? 'border-t border-border' : ''}`}>
                  <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Productos
                  </p>
                  {productResults.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => go(`/producto/${p.slug}`)}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-accent transition-colors"
                    >
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        loading="lazy"
                        className="h-10 w-10 flex-shrink-0 rounded object-cover bg-background"
                      />
                      <span className="flex-1 text-sm text-foreground line-clamp-2">{p.name}</span>
                      {p.price > 0 && (
                        <span className="whitespace-nowrap text-sm font-semibold text-primary">
                          {formatPrice(p.price)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => go(`/tienda?search=${encodeURIComponent(trimmed)}`)}
                className="w-full border-t border-border py-3 text-center text-sm font-medium text-primary hover:bg-accent transition-colors"
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No se encontraron resultados para "{trimmed}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
