# Mini CRM - Campaign Management Module

A full-stack Laravel + React web application for managing clients and marketing campaigns with comprehensive dashboard analytics.

## Tech Stack

- **Backend**: Laravel 12
- **Frontend**: React 18 with Inertia.js
- **Database**: MySQL
- **Styling**: TailwindCSS
- **Authentication**: Laravel Breeze with Sanctum

## Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 16+ and npm
- MySQL 8.0+
- Git

## Environment Setup

### Step 1: Clone Repository & Install Dependencies


git clone <your-repo-url>
cd mini-crm
composer install
npm install


### Step 2: Environment Configuration

Copy `.env.example` to `.env` and configure database:


cp .env.example .env


Update `.env` with your database credentials:


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mini_crm
DB_USERNAME=root
DB_PASSWORD=


### Step 3: Generate Application Key


php artisan key:generate


### Step 4: Create Database


mysql -u root -e "CREATE DATABASE mini_crm;"


## Database Setup

### Run Migrations


php artisan migrate


### Database Seeders

Seeders populate the database with demo data. Available seeders:

#### 1. **Run All Seeders**

php artisan db:seed

Creates:
- Test User (email: `test@example.com`, password: `password`)
- Admin User (email: `admin@crm.com`, password: `password`)
- 15 Clients with demo data
- 5 Campaigns per client (75 total campaigns)

#### 2. **Run Specific Seeders**


# Seed only admin user
php artisan db:seed --class=AdminUserSeeder

# Seed only clients (15 demo clients)
php artisan db:seed --class=ClientSeeder

# Seed only campaigns (5 campaigns per existing client)
php artisan db:seed --class=CampaignSeeder


#### 3. **Refresh Database with Fresh Seeds**

# Reset and reseed all data
php artisan migrate:fresh --seed

# Reset and reseed with specific seeder
php artisan migrate:fresh --seed --seeder=ClientSeeder


#### Seeder Details

| Seeder | Records Created | Purpose |
|--------|-----------------|---------|
| AdminUserSeeder | 1 Admin | Creates admin user (admin@crm.com) |
| ClientSeeder | 15 Clients | Demo client data |
| CampaignSeeder | 75 Campaigns | 5 campaigns per client |
| DatabaseSeeder | Test User + All Above | Runs all seeders |

## Frontend Build


# Development
npm run dev

# Production
npm run build


## Start Application


# Terminal 1: Start Laravel server
php artisan serve
# Runs at: http://localhost:8000

# Terminal 2: Start Vite dev server (in another terminal)
npm run dev


## Quick Start

1. Access the application at `http://localhost:8000`
2. Test Account:
   - Email: `test@example.com`
   - Password: `password`
3. Navigate to Clients and Campaigns sections

## GitHub Repository

https://github.com/rahulbirap/mini-crm

## License

MIT License
