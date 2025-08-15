# CrystallEdge Docs

Это основанная на `mdbook` документация для разработчиков проекта CrystallEdge, расположенного в [отдельном репозитории](https://github.com/crystallpunk-14/crystall-punk-14).
Эта документация покрывает все аспекты разработки игры, включая:
- Визуальный стиль
- Геймдизайн

Документация будет полезна любым людям, заинтересованным в разработке проекта, включая спрайтеров, мапперов и програмистов.

Документация при помощи `MkDocs` автоматически собирается в сайт с навигацией и поиском, который при помощи `Github Pages` располагается по ссылке:
https://crystallpunk-14.github.io/crystallpunk-docs/

<img width="1615" height="721" alt="image" src="https://github.com/user-attachments/assets/2eb6c910-fe59-4bc7-8a4b-9d2ab4345a68" />

# Установка

Для локальной установки:

Необходимо иметь: Python 3.10+

Git Bash:
```
python -m venv .venv
python -m pip install --upgrade pip
pip install mkdocs mkdocs-material mkdocs-awesome-pages-plugin
mkdocs build
```

Затем вы можете запустить локальный сайт, к которому вы сможете подключиться по `http://127.0.0.1:8000/`
```
source .venv/Scripts/activate
mkdocs serve
```