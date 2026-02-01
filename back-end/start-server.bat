@echo off
echo Starting Laravel Server...
echo.
echo Make sure you are in the back-end directory
echo Server will run on http://127.0.0.1:8000
echo.
echo Press Ctrl+C to stop the server
echo.
php artisan serve --host=127.0.0.1 --port=8000
pause
