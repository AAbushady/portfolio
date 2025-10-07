---
title: "Unity Dev Log #1"
description: "Learning Unity by prototyping systems for a larger project."
publishDate: 2025-09-27 07:21:00
tags: ["Game Dev", "Unity", "Prototyping", "C#"]
status: "published"
img: \assets\UnityDevLog-1\Screenshot 2025-09-27 073715.png
---

For a few weeks now I've been working on a game that I've been thinking about for a while... The concept being "Combat Racing Mechs that Transform". The idea seems incredibly lofty, especially for someone like me who has no real experience using Unity! That being said I would not be deterred! Instead I decided to build small bite sized pieces of my game in prototypes that would allow me to have quick easy wins in learning Unity. The other advantage to this approach being I could test features in isolation before integrating them into the main project. This would allow me to nail down the "feel" before I have to worry about messing things up by fine-tuning.

To start we have two projects; there's [Time-Trial](/work/unity/time-trial), which allows me to worry about movement and race time/laps, and [WeaponsTest](/work/unity/weaponstest), which lets me create the Transformations and Weapons systems in isolation. Every racing game needs a few fundamental things: something that moves, a way to start the race, and something to race against. So that's where I started with Time-Trial.

![Gif for Unity countdown timer and car movement](/assets/UnityDevLog-1/TimeTrialCountdown.gif)

Leveraging Claude Code with the "Learning" model output-style, I was able to quickly put together a working Game Manager that took care of the Countdown Timer, as well as locking the player movement and running the lap timer on GO. Using my existing Software Engineering knowledge, I was able to rein Claude in when it attempted to create multiple scripts and advised me to make multiple managers in Unity. I felt it was much cleaner to make one interface that linked to Unity's Game Manager; then create classes for the different "systems" and link them to the RaceManager class which is ultimately what the GameManager in Unity consumed.

```C#
private void SetupSystems()
{
    // Auto-find UI components if not assigned
    if (countdownText == null)
        countdownText = GameObject.Find("CountdownText")?.GetComponent<Text>();
    if (timerText == null)
        timerText = GameObject.Find("TimerText")?.GetComponent<Text>();
    if (audioSource == null)
        audioSource = GetComponent<AudioSource>();
    // Initialize internal systems
    countdown = new CountdownSystem(this, countdownText, audioSource,
                                  countBeep, goBeep, countdownDuration);
    timer = new TimerSystem(timerText);
    // Validate setup
    if (countdownText == null)
        Debug.LogWarning("RaceManager: No countdown text found. Create UI Text named 'CountdownText'");
    if (timerText == null)
        Debug.LogWarning("RaceManager: No timer text found. Create UI Text named 'TimerText'");
}
```

**Current Features:**
- A car that moves (it's literally a cube, but it responds to WASD)
- Proper race start sequence with countdown
- A timer that tracks your lap time
- "Opponents" you can ram into (they just fall over for now)

![GIF of ramming into an NPC](/assets/UnityDevLog-1/TimeTrialCrash.gif)

The NPCs don't move yet, but having something to collide with makes the world feel less empty. Plus it's oddly satisfying to knock them over.

I'm working on adding weapons and refining the transformation system; right now "transformation" just makes the cube taller, but you have to start somewhere.

![GIF transforming into and out of "robot mode"](/assets/UnityDevLog-1/WeaponsTestTransform.gif)

The goal isn't necessarily to build the next great racing game. It's to learn Unity by building something I actually want to play.