@echo off

echo Sign in / sign out process started

node D:\app.js >> myscript.log 2>&1

echo Sign in / sign out process completed

set /p userInput=Enter image/video:

echo Opening the, %userInput%!

if "%userInput%" equ "video" (
    start "VLC Player" "D:\login.mp4"
) else (
    start "" "D:\login.jpeg"
)

pause
