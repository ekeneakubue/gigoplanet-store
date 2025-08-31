"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Heart, Star, Filter, Search, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const { addItem, isInCart, getItemQuantity } = useCart()

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 99.99,
      comparePrice: 129.99,
      rating: 4.5,
      reviews: 128,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: true,
      isNew: false,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      comparePrice: 249.99,
      rating: 4.3,
      reviews: 89,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: true,
      isNew: false,
    },
    {
      id: 3,
      name: "Ergonomic Laptop Stand",
      price: 49.99,
      comparePrice: null,
      rating: 4.7,
      reviews: 256,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: false,
      isNew: true,
    },
    {
      id: 4,
      name: "Premium Phone Case",
      price: 24.99,
      comparePrice: 34.99,
      rating: 4.2,
      reviews: 67,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: true,
      isNew: false,
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 39.99,
      comparePrice: null,
      rating: 4.4,
      reviews: 143,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: false,
      isNew: false,
    },
    {
      id: 6,
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      comparePrice: 99.99,
      rating: 4.6,
      reviews: 92,
      image: "/api/placeholder/300/300",
      category: "Electronics",
      isOnSale: true,
      isNew: false,
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "fashion", label: "Fashion" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Outdoors" },
    { value: "books", label: "Books & Media" },
  ]

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
  ]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    toast.success(`${product.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Discover amazing products at unbeatable prices</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-48">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort */}
            <div className="w-full lg:w-48">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => {
            const inCart = isInCart(product.id)
            const quantity = getItemQuantity(product.id)
            
            return (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-200 flex items-center justify-center">
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <div className="text-gray-400 text-4xl">📱</div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 space-y-2">
                    {product.isNew && (
                      <Badge className="bg-green-500">New</Badge>
                    )}
                    {product.isOnSale && (
                      <Badge className="bg-red-500">Sale</Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-2 right-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="secondary" className="w-8 h-8">
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold">${product.price}</span>
                        {product.comparePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.comparePrice}
                          </span>
                        )}
                      </div>
                      {product.isOnSale && (
                        <p className="text-sm text-red-600 font-medium">
                          {Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)}% OFF
                        </p>
                      )}
                    </div>
                    
                    {/* Cart Button */}
                    {inCart ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-green-600 font-medium">
                          In Cart ({quantity})
                        </span>
                        <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                          <Check className="w-4 h-4 mr-1" />
                          Added
                        </Button>
                      </div>
                    ) : (
                      <Button 
                        size="sm" 
                        onClick={() => handleAddToCart(product)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Load More */}
        {sortedProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}

        {/* No Results */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchTerm("")
              setSelectedCategory("all")
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
