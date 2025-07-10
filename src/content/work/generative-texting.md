---
title: generative-texting
publishDate: 2024-12-09 00:00:00
img: \assets\bxSj4jO0KBqUgAbH3zuNjCje.jpg
img_alt: Cyberpunk 2077 logo with the default female V in the behind it, the backgrop is Night City with a strong yellow hue.
description: |
  An innovative integration that connects locally hosted large language models to Cyberpunk 2077, enabling dynamic conversations with in-game characters through AI-powered text generation for enhanced roleplaying experiences.
tags:
  - Fork
  - Gaming
  - LLM
---

[This](https://github.com/AAbushady/generative-texting) is a fork of the original generative-texting mod for Cyberpunk 2077, which allowed the player to "text" in-game characters using cloud based models from providers such as OpenAI. The purpose of this fork was to expand the mod to be compatible with locally hosted solutions, as well as implement tweaks that I felt enhanced the immersion of the experience.

To ease the development process and improve code readability, prompts were offloaded to a configuration file. The reasoning behind this is that methodoligies and requirements for prompting cloud based models and getting desirable output are drasitcally different from that of local models. Local models rarely need a jailbreak for this sort of content, however cloud based models more than likey do depending on the provider.

Another enhancement I'm quite proud of is use of in-game status flagging for relationships with certain characters to drive how the character refers to you in-game. For instance if your V is in a relationship with Judy and the game has that flag set to true, the LLM will be prompted with that information and act accordingly.
