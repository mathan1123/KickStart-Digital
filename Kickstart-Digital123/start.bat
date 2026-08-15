@echo off
title Kickstart Digital - Local Server
echo ========================================================
echo   Starting Kickstart Digital Local Web Server...
echo ========================================================
cd /d "%~dp0"
start http://localhost:3000
powershell -ExecutionPolicy Bypass -File .\server.ps1
pause
