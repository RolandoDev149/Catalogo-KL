import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { products, categories, brands, vehicleTypes } from '@/data/products';

export default function StorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);

  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) return false;
      if (selectedSubcategories.length > 0 && !product.subcategory) return false;
      if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(product.subcategory)) return false;
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
      if (selectedVehicleTypes.length > 0 && !product.vehicleTypes.some(vt => selectedVehicleTypes.includes(vt))) return false;
      if (priceRange.min && product.price < parseInt(priceRange.min)) return false;
      if (priceRange.max && product.price > parseInt(priceRange.max)) return false;
      return true;
    });
  }, [searchQuery, selectedCategories, selectedSubcategories, selectedBrands, selectedVehicleTypes, priceRange]);

  const toggleFilter = (value: string, selected: string[], setSelected: (val: string[]) => void) => {
    if (selected.includes(value)) {
      setSelected(selected.filter(v => v !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setSelectedVehicleTypes([]);
    setPriceRange({ min: '', max: '' });
    setSearchParams({});
  };
  
  const availableSubcategories = useMemo(() => {
  if (selectedCategories.length === 0) return [];

  return categories
    .filter((category) => selectedCategories.includes(category.slug))
    .flatMap((category) => category.subcategories ?? []);
}, [selectedCategories]);
  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || 
                           selectedVehicleTypes.length > 0 || priceRange.min || priceRange.max;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg mb-3">CATEGORÍAS</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${category.slug}`}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={() => toggleFilter(category.slug, selectedCategories, setSelectedCategories)}
              />
              <Label htmlFor={`cat-${category.slug}`} className="text-sm cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
          {availableSubcategories.length > 0 && (
  <div>
    <h3 className="font-display text-lg mb-3">SUBCATEGORÍAS</h3>
    <div className="space-y-2">
      {availableSubcategories.map((subcategory) => (
        <div key={subcategory.id} className="flex items-center gap-2">
          <Checkbox
            id={`subcat-${subcategory.slug}`}
            checked={selectedSubcategories.includes(subcategory.slug)}
            onCheckedChange={() =>
              toggleFilter(subcategory.slug, selectedSubcategories, setSelectedSubcategories)
            }
          />
          <Label htmlFor={`subcat-${subcategory.slug}`} className="text-sm cursor-pointer">
            {subcategory.name}
          </Label>
        </div>
      ))}
    </div>
  </div>
)}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">PRECIO</h3>
        <div className="flex gap-2">
          <Input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="bg-background" />
          <Input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="bg-background" />
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">MARCAS</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox id={`brand-${brand}`} checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleFilter(brand, selectedBrands, setSelectedBrands)} />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">{brand}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-display text-lg mb-3">TIPO DE VEHÍCULO</h3>
        <div className="space-y-2">
          {vehicleTypes.slice(0, 6).map((type) => (
            <div key={type} className="flex items-center gap-2">
              <Checkbox id={`vt-${type}`} checked={selectedVehicleTypes.includes(type)} onCheckedChange={() => toggleFilter(type, selectedVehicleTypes, setSelectedVehicleTypes)} />
              <Label htmlFor={`vt-${type}`} className="text-sm cursor-pointer">{type}</Label>
            </div>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          <X className="h-4 w-4 mr-2" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl">
                {searchQuery ? `RESULTADOS PARA "${searchQuery.toUpperCase()}"` : 'CATÁLOGO'}
              </h1>
              <p className="text-muted-foreground mt-2">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filtros
                  {hasActiveFilters && (
                    <span className="ml-2 w-5 h-5 rounded-full orange-gradient text-xs flex items-center justify-center">
                      {selectedCategories.length + selectedBrands.length + selectedVehicleTypes.length}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-card">
                <SheetHeader>
                  <SheetTitle className="font-display text-xl">FILTROS</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 p-6 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="font-display text-xl">FILTROS</h2>
                </div>
                <FilterContent />
              </div>
            </aside>

            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                  <p className="text-xl text-muted-foreground mb-4">No se encontraron productos</p>
                  <Button variant="outline" onClick={clearFilters}>Limpiar filtros</Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
