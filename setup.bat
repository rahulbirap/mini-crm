@echo off
echo.
echo 🚀 Mini CRM Setup Script (Windows)
echo ===================================
echo.

echo 📦 Installing PHP dependencies...
call composer install
if errorlevel 1 exit /b 1

echo.
echo 📦 Installing Node dependencies...
call npm install
if errorlevel 1 exit /b 1

echo.
echo 📋 Copying .env file...
if not exist .env (
    copy .env.example .env
)

echo.
echo 🔑 Generating application key...
call php artisan key:generate
if errorlevel 1 exit /b 1

echo.
echo 📊 Creating database...
echo Note: Make sure MySQL is running and update DB credentials in .env if needed
call mysql -u root -e "CREATE DATABASE IF NOT EXISTS mini_crm;" 2>nul
if errorlevel 1 (
    echo Warning: Could not create database. Please create it manually or update DB credentials.
)

echo.
echo 🗂️  Running migrations...
call php artisan migrate
if errorlevel 1 exit /b 1

echo.
echo 🌱 Seeding database...
call php artisan db:seed
if errorlevel 1 exit /b 1

echo.
echo 🎨 Building frontend assets...
call npm run build
if errorlevel 1 exit /b 1

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start the development server:
echo    Command Prompt 1: php artisan serve
echo    Command Prompt 2: npm run dev
echo.
echo 📖 Access the application at: http://localhost:8000
echo    Test account: test@example.com / password
echo.
pause
