@echo off
:: Caminho até sua pasta local do repositório
cd /d "C:\Users\IzaiasCF\Documents\Projetos\Projetos-HTML"
:: Mensagem de commit padrão (você pode editar)
set /p msg="Digite a mensagem do commit: "
:: Executa os comandos Git
git add .
git commit -m "%msg%"
git push origin main

pause