# Маппинг с z-уровнями

Перед началом маппинга, убедитесь что вы находитесь не в `Debug` сборке а в `Tools` или `Release`
## Инициализация маппинга новой карты

Чтобы начать маппинг с z-уровнями, вам для начала необходимо сделать `GameMapPrototype` с настроенными слоями.

!!! warning "Будет исправлено в будущем"
    Привязка к `GameMapPrototype` - временное решение, которое будет исправлено в будущем. Отслеживание этой задачи ведется [Здесь](https://github.com/crystallpunk-14/crystall-edge/issues/173?issue=crystallpunk-14%7Ccrystall-edge%7C176)


Конечно же, для начала маппинга новой карты у вас нет файлов карт для каждого слоя, поэтому я использую отдельную пустую карту для инициализации. Вы можете скопировать ее по пути:
```
Resources/Maps/_CE/Empty.yml
```
Это пустая планетарная карта.

Это должно выглядеть следующим образом:

```yml
- type: gameMap
  id: ZMappingTest
  mapName: ZMappingTest
  mapsBelow:
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  mapPath: /Maps/_CE/Empty.yml
  mapsAbove:
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  zLevelsComponentOverrides:
    # Любые компоненты, которые вы хотите чтобы были добавлены на все карты z-уровней. Гравитация, Атмосфера, освещение, параллаксы и т.д.
    # Эти компоненты будут перезаписаны для 
  minPlayers: 0
  stations:
    Dev:
      # Дальше стандартная настройка gameMap
```

Внутри игры вы прописываете команду `znetwork-mapping Dev`. Автокомплит должен автоматически подсказать вам все валидные gameMapPrototype, у которых есть z-уровни.

## Маппинг

Сам процесс маппинге не имеет значительных отличий от стандратного маппинга. Не забудьте убедиться, что вы выдали призракам компонент CEZLevelGhostMoverComponent, чтобы иметь возможность двигаться по z-уровням во время маппинга.

!!! warning "Автосохранения"
    На текущий момент автосохранения отсутствуют для маппинга z-уровней. Отслеживание этой задачи ведется [Здесь](https://github.com/crystallpunk-14/crystall-edge/issues/173?issue=crystallpunk-14%7Ccrystall-edge%7C188)

Вы можете использовать команду `znetwork-variantize` чтобы рандомизировать внешность всех тайлов на всех з-уровнях.

Команда `znetwork-initialize` не рекомендуется к использованию на текущий момент, т.к. хоть и инициализирует все слои, но не добавляет им компонентов которые прописаны в gameMapPrototype. То есть освещения солнца например, не будет.

Команда `znetwork-remove` Удаляет все карты z-уровней.

## Сохранение

Используйте команду `znetwork-save` на нужную вам сеть z-уровней, и укажите название этой сети. Например `znetwork-save ZMappingTest`. Это сохранит все карты этой сети znetwork, и вы сможете найти их по пути:
```
.../bin/Content.Server/data/ZNetworkSaves/ZMappingTest
    ZMappingTest-2.yml
    ZMappingTest-1.yml
    ZMappingTest0.yml
    ZMappingTest1.yml
    ZMappingTest2.yml
```
в этой папке будут лежать все z-карты проименованные вашим названием сети + z-уровнем.

Все что вам осталось - скопировать эту папку в файлы ресурсов игры, например:

```
Resources/Maps/_CE/ZMappingTest
```

и перезаписать `GameMapPrototype` вашей карты, чтобы она ссылалась на новые файлы:

```yml
- type: gameMap
  id: ZMappingTest
  mapName: ZMappingTest
  mapsBelow:
  - /Maps/_CE/ZMappingTest/ZMappingTest-2.yml
  - /Maps/_CE/ZMappingTest/ZMappingTest-1.yml
  mapPath: /Maps/_CE/ZMappingTest/ZMappingTest0.yml
  mapsAbove:
  - /Maps/_CE/ZMappingTest/ZMappingTest1.yml
  - /Maps/_CE/ZMappingTest/ZMappingTest2.yml
```
