#!/bin/bash

echo "🚀 Mini CRM Setup Script"
echo "========================"

# Step 1: Install PHP dependencies
echo "📦 Installing PHP dependencies..."
composer install

# Step 2: Install Node dependencies
echo "📦 Installing Node dependencies..."
npm install

# Step 3: Copy env file
if [ ! -f .env ]; then
    echo "📋 Creating .env file..."
    cp .env.example .env
fi

# Step 4: Generate application key
echo "🔑 Generating application key..."
php artisan key:generate

# Step 5: Create database
echo "📊 Creating database..."
mysql -u root -e "CREATE DATABASE IF NOT EXISTS mini_crm;"

# Step 6: Run migrations
echo "🗂️  Running migrations..."
php artisan migrate

# Step 7: Seed database
echo "🌱 Seeding database..."
php artisan db:seed

# Step 8: Build frontend assets
echo "🎨 Building frontend assets..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start the development server:"
echo "   Terminal 1: php artisan serve"
echo "   Terminal 2: npm run dev"
echo ""
echo "📖 Access the application at: http://localhost:8000"
echo "   Test account: test@example.com / password"
