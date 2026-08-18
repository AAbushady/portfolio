---
title: WeaponsTest Prototype
publishDate: 2025-09-21 00:00:00
img: ../../../assets/weaponstest.png
img_alt: Unity game view of the WeaponsTest prototype showing the player transformed into a tall red robot block on a green firing range
description: |
  Unity firing range prototype exploring vehicle transformation, weapons handling, and combat mechanics.
tags:
  - Unity
  - Game Dev
  - C#
---

Imagine drifting around a corner at 200mph, then transforming mid-slide into a combat mech to unleash a barrage of missiles at your rival. That's the vision driving [WeaponsTest](https://github.com/AAbushady/WeaponsTest), a Unity prototype exploring seamless vehicle-to-mech transformation and combat.

The second phase of an ambitious combat racing project inspired by IGPX, Mario Kart, and Twisted Metal.

Reusing assets from [Time-Trial](/work/unity/time-trial/), I've taken the Player and NPC car prefabs and pulled them into this project. The NPC gives the Player a target, while the Player car can be expanded with transformation and weapons mechanics. Currently the Player car can transform into an upright rectangle block that follows mouse movement, the foundation for aiming. When the player transforms back to car we take the camera's forward position and place the car mode facing in that direction. In a race, this will help keep the control and flow consistent.

Work remains to fine-tune the existing systems and create true robot and car assets, and the weapons themselves still need to be created, programmed, and balanced. Using this WeaponsTest project I can isolate issues and get everything playing along nicely, so fewer bugs surface when all the systems come together.