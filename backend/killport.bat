@echo off
setlocal enabledelayedexpansion

for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8000') do (
    set "PID=%%a"
    taskkill /F /PID !PID!
)

endlocal
