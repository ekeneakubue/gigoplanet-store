# Ecommerce Store

A modern, full-featured ecommerce store built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and PostgreSQL.

## Features

### 🛍️ Customer Features
- **Product Catalog**: Browse products with search, filtering, and sorting
- **Shopping Cart**: Add/remove items, update quantities, persistent cart state
- **User Authentication**: Sign up, sign in, and account management
- **Responsive Design**: Mobile-first design that works on all devices
- **Product Reviews**: Rate and review products
- **Wishlist**: Save favorite products for later

### 🎛️ Admin Features
- **Admin Dashboard**: Overview with sales statistics and analytics
- **Product Management**: Add, edit, and manage products
- **Order Management**: Process and track customer orders
- **Customer Management**: View and manage customer accounts
- **Inventory Tracking**: Monitor stock levels and low stock alerts
- **Sales Analytics**: Comprehensive business insights and reports

### 🛠️ Technical Features
- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with secure credential authentication
- **State Management**: React Context for cart and user state
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **State Management**: React Context API
- **Icons**: Lucide React
- **Forms**: React Hook Form with validation
- **Notifications**: Sonner toast notifications

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ecommerce-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
   
   # NextAuth
   NEXTAUTH_SECRET="your-secret-key-here"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # (Optional) Seed the database with sample data
   npx prisma db seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Database Setup

1. **Install PostgreSQL** on your system
2. **Create a new database**:
   ```sql
   CREATE DATABASE ecommerce_db;
   ```
3. **Update the DATABASE_URL** in your `.env` file with your database credentials
4. **Run migrations** to create the database schema

## Project Structure

```
ecommerce-store/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── auth/              # Authentication pages
│   │   ├── cart/              # Shopping cart page
│   │   ├── products/          # Product catalog pages
│   │   └── api/               # API routes
│   ├── components/             # Reusable UI components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── providers/         # Context providers
│   │   └── navigation.tsx     # Main navigation
│   ├── contexts/               # React contexts
│   │   └── cart-context.tsx   # Shopping cart context
│   └── lib/                    # Utility functions
│       ├── auth.ts            # NextAuth configuration
│       └── db.ts              # Database utilities
├── prisma/                     # Database schema and migrations
├── public/                     # Static assets
└── components.json             # shadcn/ui configuration
```

## Key Components

### Cart Context
The shopping cart functionality is managed through a React context that provides:
- Add/remove items
- Update quantities
- Calculate totals
- Persistent cart state

### Authentication
NextAuth.js handles user authentication with:
- Email/password authentication
- Role-based access control (Admin/Customer)
- Secure session management
- Protected routes

### Database Schema
Comprehensive database design including:
- Users and authentication
- Products and categories
- Orders and order items
- Reviews and ratings
- Addresses and shipping

## Admin Access

To access the admin dashboard:

1. **Create an admin user** by updating the database directly:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```

2. **Or modify the signup API** to create admin users during development

3. **Navigate to** `/admin` after signing in with admin credentials

## Customization

### Adding New Products
1. Use the admin dashboard to add products
2. Or modify the mock data in the products page
3. Update the database schema if needed

### Styling
- Modify Tailwind CSS classes in component files
- Update the design system in `components.json`
- Customize shadcn/ui component variants

### Features
- Add new pages in the `src/app` directory
- Create new API routes in `src/app/api`
- Extend the database schema in `prisma/schema.prisma`

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
- **Netlify**: Similar to Vercel deployment
- **Railway**: Good for full-stack apps with database
- **DigitalOcean**: Self-hosted deployment option

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the code examples

## Roadmap

- [ ] Payment processing integration (Stripe)
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Product variants and options
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Advanced analytics dashboard
- [ ] Inventory management system
- [ ] Shipping calculator
- [ ] Customer support chat

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
