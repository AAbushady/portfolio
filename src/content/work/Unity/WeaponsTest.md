---
title: WeaponsTest Prototype
publishDate: 2025-09-21 00:00:00
img: /assets/weaponstest.png
description: |
  Unity firing range prototype vehicle transformation, weapons handling, and combat mechanics.
tags:
  - Unity
  - Game Development
  - C#
---

Imagine drifting around a corner at 200mph, then transforming mid-slide into a combat mech to unleash a barrage of missiles at your rival. That's the vision driving [WeaponsTest](https://github.com/AAbushady/WeaponsTest), a Unity prototype exploring seamless vehicle-to-mech transformation and combat.

The second phase of an ambitious combat racing project inspired by IGPX, Mario Kart, and Twisted Metal. WeaponsTest is about creating engaging and fluid transformation and combat systems.

Reusing assets from [Time-Trial](/work/unity/time-trial), I've taken the Player and NPC car prefabs and pulled them into this project. The NPC gives the Player a target, while the Player car can be expanded with transformation and weapons mechanics. Currently the Player car can transform into an upright rectangle block; this block then has the ability to follow mouse movement, the foundation for aiming. When the player transforms back to car we take the camera's forward position and place the car mode facing in that direction; when racing this will help keep the control and flow of the race consistent.

Work will need to be done to fine-tune the existing systems, and create true robot and car assets; not to mention the weapons themselves will need to be created, programmed, and tweaked/balanced. Using this WeaponsTest project I can isolate bugs and issues and get everything playing along together nicely to minimize the bugs when all systems are integrated together.