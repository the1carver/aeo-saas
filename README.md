## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@the1carver](https://github.com/the1carver)

Project Link: [https://github.com/the1carver/aeo-saas](https://github.com/the1carver/aeo-saas)

## Troubleshooting

If you encounter issues with pushing to the remote repository, you can try the following:

```bash
# Remove the current git setup
rm -rf .git

# Initialize new repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: AEO SaaS project setup"

# Add remote
git remote add origin https://github.com/the1carver/aeo-saas.git

# Push to main branch
git push -u origin main
```

# Create new directories
mkdir -p aeo-saas-frontend/src/components/layout
mkdir -p aeo-saas-frontend/src/components/auth
mkdir -p aeo-saas-frontend/src/components/project
mkdir -p aeo-saas-frontend/src/components/aeo

# Move and rename components
mv aeo-saas-frontend/src/components/Navbar.jsx aeo-saas-frontend/src/components/layout/
mv aeo-saas-frontend/src/components/PrivateRoute.jsx aeo-saas-frontend/src/components/auth/

# Rename service files
mv aeo-saas-frontend/src/services/apiClient.js aeo-saas-frontend/src/services/httpClient.js
mv aeo-saas-frontend/src/services/api.js aeo-saas-frontend/src/services/aeoService.js

# Rename controllers
mv controllers/contentController.js controllers/aeoController.js

# Create middleware directory if it doesn't exist
mkdir -p middleware

# Create middleware files
mv middleware/authMiddleware.js middleware/auth.js
mv middleware/subscriptionMiddleware.js middleware/subscription.js