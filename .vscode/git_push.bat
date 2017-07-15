@echo off
set newCommit=Batch Update:%date:~2,8%_%time:~0,5% 
REM echo %newCommit%

git add .
git commit -m "%newCommit%"
git push origin master

REM timeout /t 3 /nobreak