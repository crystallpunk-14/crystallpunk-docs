# Маппинг с z-уровнями

Перед началом маппинга, убедитесь что вы находитесь не в `Debug` сборке а в `Tools` или `Release`
## Инициализация маппинга новой карты

Для начала маппинга новой карты у вас нет файлов карт для каждого слоя, поэтому я использую отдельную пустую карту для инициализации. Вы можете скопировать ее по пути:
```
Resources/Maps/_CE/Empty.yml
```
Это пустая планетарная карта, с уже настроенными компонентами атмосферы и освещения. 

вы можете начать маппить с нуля, воспользовавшись командами:

1)`mapping 1000 [путь к карте]`
2)`mapping 1001 [путь к карте]`
3)`mapping 1002 [путь к карте]`
4_`znetwork-combine 1000 1001 1002`

Это создаст вам сеть з-уровней для маппинга. Дополнить ее во время работы можно как

- `znetwork-add-above [znetwork id] [путь к карте]`
- `znetwork-add-below [znetwork id] [путь к карте]`

## Сохранение

чтобы сохранить вашу сеть, используйте команду

`znetwork-save [znetwork id] [name]`

и ваши карты будут сохранены по пути `\bin\Content.Server\data\ZNetworkSaves` в виде папки с несколькими картами.

## Загрузка 

Вы можете использовать эти карты для запуска з-сети внутри раунда двумя методами.

1) zMap prototype. Это отдельный прототип znetwork, который можно использовать для различных систем вроде процедурной генерации. Редко используется.
```yml
- type: zMap
  id: Empty
  maps:
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  - /Maps/_CE/Empty.yml
  components:
    - type: MapAtmosphere
      space: False
      mixture:
        volume: 2500
        immutable: True
        temperature: 293.15
        moles:
          Oxygen: 21.824879
          Nitrogen: 82.10312
    - type: Parallax
      parallax: CESky
    - type: SunShadowCycle
      offset: 490
    - type: LightCycle
      offset: 490
      originalColor: "#c8fdff"
    - type: CEZLevelRoof
    - type: SunShadow
    - type: MapLight
      ambientLightColor: "#c8fdff"
```

2) gameMap prototype. В существующий стандартный gameMap прототип можно добавить новый компонент `CEStationZLevels`. При инициализации карты с этим компонентом, дополнительно загружаются z-уровни. Выглядит следующим образом:

```yml
- type: gameMap
  id: ZMappingTest
  mapName: ZMappingTest
  mapPath: /Maps/_CE/Empty.yml
  minPlayers: 0
  stations:
    Dev:
      components:
        - type: CEStationZLevels
          mapsBelow:
          - /Maps/_CE/Shaar/Shaar-2.yml
          - /Maps/_CE/Shaar/Shaar-1.yml
          mapsAbove:
          - /Maps/_CE/Shaar/Shaar1.yml
          - /Maps/_CE/Shaar/Shaar2.yml
          - /Maps/_CE/Shaar/Shaar3.yml
          zLevelsComponentOverrides:
            # Любые компоненты, которые вы хотите чтобы были добавлены на все карты z-уровней. Гравитация, Атмосфера, освещение, параллаксы и т.д.
      # Дальше стандартная настройка gameMap
```

вы можете сразу же открывать маппинг всей znetwork, при помощи этих двух команд:
1) `znetwork-mapping [название прототипа zMap]`
2) `znetwork-gamemap-mapping [название gameMap прототипа]`

Автокомплит должен автоматически подсказать вам все валидные gameMapPrototype, у которых есть z-уровни.

## Маппинг

Сам процесс маппинге не имеет значительных отличий от стандратного маппинга. Не забудьте убедиться, что вы выдали призракам компонент CEZLevelGhostMoverComponent, чтобы иметь возможность двигаться по z-уровням во время маппинга.

!!! warning "Автосохранения"
    На текущий момент автосохранения отсутствуют для маппинга z-уровней. Отслеживание этой задачи ведется [Здесь](https://github.com/crystallpunk-14/crystall-edge/issues/173?issue=crystallpunk-14%7Ccrystall-edge%7C188)

Вы можете использовать команду `znetwork-variantize` чтобы рандомизировать внешность всех тайлов на всех з-уровнях.
