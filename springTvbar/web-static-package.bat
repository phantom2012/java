title 打包全部文件
@echo off

@rem 得到参数
set PROJECT=tvbar
set CURRENT_PATH=%cd%
set SOURCE_PATH=%CURRENT_PATH%
set WEB_PATH=%SOURCE_PATH%\%PROJECT%-web
echo ++++++++++++++++current path %CURRENT_PATH% ++++++++++++++++++

@rem 进入tvbar-web把相应的js压缩
echo ++++++++++++++++js css compress start++++++++++++++++
cd  %WEB_PATH%
@rem call mvn compile -e
call mvn yuicompressor:compress 
echo ++++++++++++++++js css compress end++++++++++++++++

echo ++++++++++++++++move source to %PROJECT% start++++++++++++++++
@rem 把打好包的tvbar-web下 static和WEB-INF文件夹移动到tvbar目录
xcopy /e /y "%WEB_PATH%\src\main\webapp\static" "%CURRENT_PATH%\static"
xcopy /e /y "%WEB_PATH%\static" "%CURRENT_PATH%\static"
xcopy /e /y "%WEB_PATH%\src\main\webapp\WEB-INF\jsp" "%CURRENT_PATH%\static\jsp"
echo ++++++++++++++++move source to %PROJECT% end++++++++++++++++

echo ++++++++++++++++delete source %PROJECT%-web target start++++++++++++++++
@rem 删除tvbar-web下的 target 目录
rd /s /q "%WEB_PATH%\target"
rd /s /q "%WEB_PATH%\static"
echo ++++++++++++++++delete source %PROJECT%-web target end++++++++++++++++

echo ok!
pause