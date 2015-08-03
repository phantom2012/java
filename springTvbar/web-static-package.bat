title ���ȫ���ļ�
@echo off

@rem �õ�����
set PROJECT=tvbar
set CURRENT_PATH=%cd%
set SOURCE_PATH=%CURRENT_PATH%
set WEB_PATH=%SOURCE_PATH%\%PROJECT%-web
echo ++++++++++++++++current path %CURRENT_PATH% ++++++++++++++++++

@rem ����tvbar-web����Ӧ��jsѹ��
echo ++++++++++++++++js css compress start++++++++++++++++
cd  %WEB_PATH%
@rem call mvn compile -e
call mvn yuicompressor:compress 
echo ++++++++++++++++js css compress end++++++++++++++++

echo ++++++++++++++++move source to %PROJECT% start++++++++++++++++
@rem �Ѵ�ð���tvbar-web�� static��WEB-INF�ļ����ƶ���tvbarĿ¼
xcopy /e /y "%WEB_PATH%\src\main\webapp\static" "%CURRENT_PATH%\static"
xcopy /e /y "%WEB_PATH%\static" "%CURRENT_PATH%\static"
xcopy /e /y "%WEB_PATH%\src\main\webapp\WEB-INF\jsp" "%CURRENT_PATH%\static\jsp"
echo ++++++++++++++++move source to %PROJECT% end++++++++++++++++

echo ++++++++++++++++delete source %PROJECT%-web target start++++++++++++++++
@rem ɾ��tvbar-web�µ� target Ŀ¼
rd /s /q "%WEB_PATH%\target"
rd /s /q "%WEB_PATH%\static"
echo ++++++++++++++++delete source %PROJECT%-web target end++++++++++++++++

echo ok!
pause