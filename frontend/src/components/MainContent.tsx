import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99,
    image: "🎧",
    rating: 4.5,
    reviews: 128,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199,
    image: "⌚",
    rating: 4.8,
    reviews: 89,
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49,
    image: "💻",
    rating: 4.3,
    reviews: 156,
  },
  {
    id: 4,
    name: "Phone Case",
    price: 29,
    image: "📱",
    rating: 4.7,
    reviews: 203,
  },
];

export const MainContent = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      {/* Hero Banner */}
      <div className="bg-gray-100 rounded-lg p-8 mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to TechShop</h1>
        <p className="text-gray-600 mb-4">Discover amazing tech products at great prices</p>
        <Button size="lg">Shop Now</Button>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{product.image}</div>
              <CardTitle className="text-lg">{product.name}</CardTitle>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span>{product.rating}</span>
                </div>
                <span>({product.reviews} reviews)</span>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-2xl font-bold">${product.price}</div>
              <Button className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};