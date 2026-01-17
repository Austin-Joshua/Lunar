# Lunar Backend - Deployment Guide

Complete guide for deploying the Lunar backend to production environments.

---

## 🚀 Deployment Options

### Option 1: Heroku Deployment

#### Prerequisites
- Heroku Account
- Heroku CLI installed
- Git repository

#### Steps

1. **Create Heroku App**
```bash
heroku login
heroku create lunar-api
```

2. **Add MySQL Database (ClearDB)**
```bash
heroku addons:create cleardb:ignite
```

3. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET="your_super_secret_key"
heroku config:set NODE_ENV="production"
heroku config:set CORS_ORIGIN="https://yourdomain.com"
```

4. **Deploy**
```bash
git push heroku main
```

5. **Run Database Migrations**
```bash
heroku run "mysql -h your_db_host -u your_db_user -p your_db_password < database/schema.sql"
```

---

### Option 2: AWS Deployment

#### Using EC2 + RDS

1. **Create EC2 Instance**
   - Choose Ubuntu 20.04 LTS
   - Security group: Allow ports 80, 443, 5000

2. **SSH into Instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

4. **Install MySQL Client**
```bash
sudo apt-get install -y mysql-client
```

5. **Clone Repository**
```bash
git clone https://github.com/Austin-Joshua/Lunar.git
cd Lunar/Backend
npm install
```

6. **Create Environment File**
```bash
sudo nano .env
```

7. **Create RDS Instance**
   - Engine: MySQL 8.0
   - Multi-AZ: Yes (for production)
   - Database name: lunar_db
   - Save endpoint

8. **Update .env with RDS**
```env
DB_HOST=your-rds-endpoint
DB_PORT=3306
DB_NAME=lunar_db
DB_USER=admin
DB_PASSWORD=strong_password
PORT=5000
NODE_ENV=production
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://yourdomain.com
```

9. **Initialize Database**
```bash
mysql -h your-rds-endpoint -u admin -p < database/schema.sql
mysql -h your-rds-endpoint -u admin -p < database/seed.sql
```

10. **Install PM2 (Process Manager)**
```bash
npm install -g pm2
```

11. **Start Application**
```bash
pm2 start server.js --name "lunar-api"
pm2 save
pm2 startup
```

12. **Setup Nginx Reverse Proxy**
```bash
sudo apt-get install -y nginx

sudo nano /etc/nginx/sites-available/default
```

Add configuration:
```nginx
upstream lunar_api {
    server 127.0.0.1:5000;
}

server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://lunar_api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

13. **Test and Restart Nginx**
```bash
sudo nginx -t
sudo systemctl restart nginx
```

---

### Option 3: DigitalOcean App Platform

1. **Create App**
   - Connect GitHub repository
   - Select Lunar/Backend directory
   - Choose Node.js runtime

2. **Add Environment Variables**
   - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
   - `JWT_SECRET`, `CORS_ORIGIN`, `NODE_ENV`

3. **Add MySQL Database**
   - Create managed MySQL database
   - Update database credentials in app

4. **Deploy**
   - Click Deploy
   - Wait for build and deployment

---

### Option 4: Vercel Deployment

**Note:** Vercel is optimized for serverless functions and API routes. For a full Node.js backend with database connections, AWS, Heroku, or DigitalOcean are better options.

---

## 🔒 Production Security Checklist

- [ ] **Environment Variables**
  - [ ] JWT_SECRET is strong and unique
  - [ ] Database password is strong
  - [ ] CORS_ORIGIN is set to production domain
  - [ ] NODE_ENV is set to 'production'

- [ ] **Database**
  - [ ] SSL enabled for database connection
  - [ ] Database backups enabled
  - [ ] Read replicas configured (if high traffic)
  - [ ] Regular backup schedule

- [ ] **API**
  - [ ] Rate limiting implemented
  - [ ] HTTPS enabled (SSL certificate)
  - [ ] CORS properly configured
  - [ ] Input validation on all endpoints
  - [ ] Error responses don't expose sensitive info

- [ ] **Monitoring**
  - [ ] Error logging service setup
  - [ ] Performance monitoring
  - [ ] Uptime monitoring
  - [ ] Alert notifications configured

- [ ] **Infrastructure**
  - [ ] Auto-scaling configured
  - [ ] Load balancing setup
  - [ ] DDoS protection enabled
  - [ ] Firewall rules configured

---

## 📦 Performance Optimization

### 1. Enable Compression
```javascript
// In server.js
const compression = require('compression');
app.use(compression());
```

### 2. Connection Pooling
Already implemented in `config/db.js` with:
```javascript
connectionLimit: 10
```

### 3. Query Optimization
- Indexes already created in schema.sql
- Use EXPLAIN to analyze queries

### 4. Caching Strategy
Consider adding Redis for:
- Session management
- Product caching
- Rate limiting

### 5. Database Query Optimization
```javascript
// Use prepared statements (already implemented)
// Avoid N+1 queries
// Use proper indexing
// Monitor slow query log
```

---

## 🐛 Troubleshooting Deployment

### Issue: Database Connection Failed
**Solution:**
```bash
# Test connection
mysql -h host -u user -p database_name

# Check firewall rules
# Ensure security group allows port 3306
```

### Issue: CORS Errors
**Solution:**
- Verify CORS_ORIGIN in .env matches frontend URL
- Check Authorization header is allowed

### Issue: High Memory Usage
**Solution:**
```bash
# Monitor process
pm2 monit

# Increase Node.js memory
node --max-old-space-size=4096 server.js
```

### Issue: Timeout Errors
**Solution:**
- Increase timeout values
- Optimize long-running queries
- Implement query batching

---

## 📊 Monitoring & Logging

### Setup Monitoring with PM2 Plus

```bash
pm2 install pm2-auto-pull
pm2 install pm2-logrotate
pm2 web  # Access at http://localhost:9615
```

### Setup Error Logging

Add to `server.js`:
```javascript
const fs = require('fs');
const path = require('path');

// Log errors to file
const errorLog = fs.createWriteStream(
  path.join(__dirname, 'logs/error.log'),
  { flags: 'a' }
);

process.on('uncaughtException', (error) => {
  errorLog.write(`${new Date().toISOString()}: ${error.stack}\n`);
  console.error(error);
});
```

---

## 🔄 CI/CD Pipeline Setup

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
      working-directory: ./Backend
    
    - name: Run tests
      run: npm test
      working-directory: ./Backend
    
    - name: Deploy to Production
      run: |
        # Your deployment script here
        git config --global user.email "ci@example.com"
        git config --global user.name "CI Bot"
        git push heroku main
```

---

## 📈 Scaling Strategy

### Horizontal Scaling
1. Load Balancer (Nginx, HAProxy)
2. Multiple API instances
3. Shared database
4. Redis for sessions

### Vertical Scaling
1. Increase server resources
2. Optimize queries
3. Implement caching

### Database Scaling
1. Read replicas for SELECT queries
2. Write-only master
3. Connection pooling

---

## 💾 Backup & Recovery

### Database Backup

**Daily Backup Script:**
```bash
#!/bin/bash
BACKUP_DIR="/backups/mysql"
DB_USER="root"
DB_NAME="lunar_db"
DATE=$(date +%Y%m%d_%H%M%S)

mysqldump -u$DB_USER -p$DB_PASSWORD $DB_NAME > $BACKUP_DIR/lunar_db_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete
```

**Restore from Backup:**
```bash
mysql -u user -p database_name < backup_file.sql
```

---

## 🆘 Rollback Procedure

```bash
# If deployment fails
pm2 stop all
git revert <commit-hash>
npm install
pm2 start server.js
```

---

## 📞 Support & Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Documentation](https://nginx.org/en/docs/)

---

## ✅ Deployment Checklist

- [ ] Environment variables configured
- [ ] Database created and migrated
- [ ] SSL certificate installed
- [ ] Load balancer configured
- [ ] Monitoring setup
- [ ] Logging enabled
- [ ] Backups scheduled
- [ ] CI/CD pipeline created
- [ ] Team notified
- [ ] Runbook documented

---

**Lunar Backend Deployment Guide v1.0**
