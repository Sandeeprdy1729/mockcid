#!/bin/bash

# MOCK CID Setup Script

echo "🔧 MOCK CID — The Silent Transfer"
echo "Setting up production-grade interactive mystery game..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 16+ first."
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
    echo ""
    echo "🚀 Ready to start development!"
    echo ""
    echo "Commands:"
    echo "  npm run dev     - Start development server (http://localhost:3000)"
    echo "  npm run build   - Build for production"
    echo "  npm run preview - Preview production build"
    echo ""
    echo "📝 Game PIN: 1028"
    echo "💡 Passwords are stored in src/data/passwords.js"
    echo ""
else
    echo "❌ Failed to install dependencies"
    exit 1
fi
