---
title: Generative Texting
publishDate: 2024-12-09 00:00:00
featured: 3
img: ../../assets/generative-texting.jpg
img_alt: Cyberpunk 2077 logo with female character V against Night City's yellow-tinted backdrop
description: |
  A Cyberpunk 2077 mod fork that connects locally hosted LLMs to the game, letting you text in-game characters with no cloud provider required.
tags:
  - Fork
  - Gaming
  - LLM
---

[This](https://github.com/AAbushady/generative-texting) is a fork of the original generative-texting mod for Cyberpunk 2077, which allowed the player to "text" in-game characters using cloud-based models from providers such as OpenAI. The purpose of this fork was to expand the mod to be compatible with locally hosted solutions, as well as implement tweaks that I felt enhanced the immersion of the experience.

To ease the development process and improve code readability, prompts were offloaded to a configuration file. Methodologies and requirements for prompting cloud-based models and getting desirable output are drastically different from those of local models. Local models rarely need a jailbreak for this sort of content, but cloud-based models more than likely do depending on the provider.

Another enhancement I'm quite proud of is the use of in-game status flagging for relationships with certain characters to drive how the character refers to you in-game. For instance if your V is in a relationship with Judy and the game has that flag set to true, the LLM will be prompted with that information and act accordingly.
