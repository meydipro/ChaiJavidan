#!/bin/bash

echo "🚀 راه‌اندازی چای جاویدان..."

# Start Backend
cd backend
echo "📦 شروع بک‌اند (http://localhost:5001)"
npm run dev &
BACKEND_PID=$!

# Wait a moment
sleep 2

# Start Frontend
cd ../frontend
echo "🌐 شروع فرانت‌اند (http://localhost:5173)"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ سایت آماده است!"
echo "   - سایت: http://localhost:5173"
echo "   - پنل ادمین: http://localhost:5173/admin"
echo "   - لاگین: admin@chaijavidan.com / admin123"
echo ""
echo "برای توقف: Ctrl+C"

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT
wait
