# getthru-admin-panel


![Project Logo](/public/assets/images/logo/getthru_adminlogo.png)

[![Laravel Version](https://img.shields.io/badge/Laravel-10.x-FF2D20?style=flat-square&logo=laravel)](https://laravel.com/)
[![PHP Version](https://img.shields.io/badge/PHP-8.1%2B-777BB4?style=flat-square&logo=php)](https://php.net/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/username/repo-name/ci.yml?style=flat-square)](https://github.com/username/repo-name/actions)

The GetThru Admin Panel is a streamlined web-based system designed to eliminate paperwork, simplify fibre installation requests, and provide efficient process tracking with automated reporting.

Instead of manually handling forms and invoices, customers can easily submit their requests online, while admins gain visibility into every stage of the workflow — from order submission to installation and billing.

## 📸 Screenshots

### Dashboard
![Dashboard Screenshot](/public/assets/images/screenshots/dashboard.png)

### Installation Management
![Installation Management Screenshot](/public/assets/images/screenshots/installations.png)(/public/assets/images/screenshots/upload.png)



### Invoice Management
![Invoice Management Screenshot](/public/assets/images/screenshots/invoicing.png)

### Package Management
![Package Management Screenshot](/public/assets/images/screenshots/packages.png)
## ✨ Features

- **User Authentication & Authorization** - Complete user management system with roles and permissions
- **Dashboard Analytics** - Real-time data visualization and reporting
- **API Integration** - RESTful API with comprehensive documentation
- **Multi-language Support** - Internationalization ready
- **Email Notifications** - Automated email system with queues
- **File Management** - Upload, store, and manage files securely
- **Admin Panel** - Comprehensive admin interface
- **Responsive Design** - Mobile-first, responsive UI

## 🚀 Demo

**Live Demo:** [https://your-demo-url.com](https://your-demo-url.com)

**Demo Credentials:**
- Admin: `admin@example.com` / `password`
- User: `user@example.com` / `password`

## 🛠️ Tech Stack

- **Backend:** Laravel 10.x, PHP 8.1+
- **Frontend:** Blade Templates, Alpine.js, Tailwind CSS
- **Database:** MySQL 8.0 / PostgreSQL
- **Cache:** Redis
- **Queue:** Redis/Database
- **Storage:** Local/AWS S3
- **Testing:** PHPUnit, Laravel Dusk

## 📋 Requirements

- PHP 8.1 or higher
- Composer 2.x
- Node.js 16+ and npm
- MySQL 8.0+ or PostgreSQL 13+
- Redis (optional, for caching and queues)

## 🏃‍♂️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/username/repo-name.git
cd repo-name
```

### 2. Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install Node.js dependencies
npm install
```

### 3. Environment Setup

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Configure Environment Variables

Edit `.env` file with your settings:

```env
APP_NAME="Your App Name"
APP_ENV=local
APP_KEY=base64:generated-key-here
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password

# Email Configuration (optional)
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls

# Cache & Queue (optional)
CACHE_DRIVER=redis
QUEUE_CONNECTION=redis
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
```

### 5. Database Setup

```bash
# Run database migrations
php artisan migrate

# Seed the database with sample data
php artisan db:seed

# Or run both together
php artisan migrate --seed
```

### 6. Storage Setup

```bash
# Create symbolic link for storage
php artisan storage:link
```

### 7. Build Frontend Assets

```bash
# For development
npm run dev

# For production
npm run build

# Watch for changes (development)
npm run watch
```

### 8. Start the Application

```bash
# Start Laravel development server
php artisan serve

# Start queue worker (in separate terminal)
php artisan queue:work

# Start Laravel scheduler (for production)
php artisan schedule:work
```

Visit `http://localhost:8000` in your browser.

## 🐳 Docker Setup (Alternative)

If you prefer using Docker:

```bash
# Clone the repository
git clone https://github.com/username/repo-name.git
cd repo-name

# Start with Docker Compose
docker-compose up -d

# Install dependencies
docker-compose exec app composer install

# Set up the application
docker-compose exec app php artisan key:generate
docker-compose exec app php artisan migrate --seed
docker-compose exec app php artisan storage:link
```

## 🧪 Testing

```bash
# Run PHPUnit tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run tests with coverage
php artisan test --coverage

# Run browser tests (Laravel Dusk)
php artisan dusk
```

## 📚 API Documentation

API documentation is available at `/api/documentation` when running the application, or view the [online documentation](https://your-api-docs-url.com).

### Authentication

```bash
# Get authentication token
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password"}'
```

### Example API Calls

```bash
# Get user profile
curl -X GET http://localhost:8000/api/user \
  -H "Authorization: Bearer your-token-here"

# Create a new post
curl -X POST http://localhost:8000/api/posts \
  -H "Authorization: Bearer your-token-here" \
  -H "Content-Type: application/json" \
  -d '{"title": "New Post", "content": "Post content here"}'
```

## 🚀 Deployment

### Production Setup

1. **Server Requirements:**
   - PHP 8.1+ with required extensions
   - Composer
   - Web server (Nginx/Apache)
   - MySQL/PostgreSQL
   - Redis (recommended)

2. **Deploy Steps:**

```bash
# Clone repository
git clone https://github.com/username/repo-name.git
cd repo-name

# Install dependencies
composer install --optimize-autoloader --no-dev

# Set up environment
cp .env.example .env
# Edit .env with production values

# Generate key and cache config
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations
php artisan migrate --force

# Set permissions
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

### Using Laravel Forge

Deploy easily with [Laravel Forge](https://forge.laravel.com/) for automated deployments.

### Using Docker in Production

```bash
# Build production image
docker build -t your-app-name .

# Deploy with docker-compose
docker-compose -f docker-compose.prod.yml up -d
```

## 📁 Project Structure

```
├── app/
│   ├── Http/Controllers/     # Application controllers
│   ├── Models/              # Eloquent models
│   ├── Services/            # Business logic services
│   └── Providers/           # Service providers
├── database/
│   ├── migrations/          # Database migrations
│   ├── seeders/            # Database seeders
│   └── factories/          # Model factories
├── resources/
│   ├── views/              # Blade templates
│   ├── js/                 # JavaScript files
│   └── css/                # Stylesheets
├── routes/
│   ├── web.php             # Web routes
│   ├── api.php             # API routes
│   └── console.php         # Artisan commands
├── tests/
│   ├── Feature/            # Feature tests
│   └── Unit/               # Unit tests
├── public/                 # Public assets
├── storage/                # Application storage
└── vendor/                 # Composer dependencies
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## 🐛 Bug Reports & Feature Requests

- **Bug Reports:** [Create an issue](https://github.com/username/repo-name/issues/new?template=bug_report.md)
- **Feature Requests:** [Create an issue](https://github.com/username/repo-name/issues/new?template=feature_request.md)

## 📜 Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and versions.

## 🔒 Security

If you discover any security-related issues, please email security@yourapp.com instead of using the issue tracker.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors & Contributors

- **Your Name** - *Initial work* - [@username](https://github.com/username)
- **Contributor Name** - *Feature XYZ* - [@contributor](https://github.com/contributor)

See also the list of [contributors](https://github.com/username/repo-name/contributors) who participated in this project.

## 🙏 Acknowledgments

- Laravel community for the amazing framework
- [Package Name](https://github.com/package-repo) for specific functionality
- Inspiration from [similar project](https://github.com/inspiration-repo)
- Special thanks to all contributors

## 📞 Support

- **Documentation:** [Wiki](https://github.com/username/repo-name/wiki)
- **Community:** [Discord](https://discord.gg/your-server)
- **Email:** support@yourapp.com
- **Issues:** [GitHub Issues](https://github.com/username/repo-name/issues)

---

<p align="center">Made with ❤️ by <a href="https://github.com/username">Your Name</a></p>