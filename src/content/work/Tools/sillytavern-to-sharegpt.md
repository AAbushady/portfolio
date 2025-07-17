---
title: sillytavern-to-sharegpt
publishDate: 2024-05-17 00:00:00
img: /assets/sts-screenshot.png
img_alt: Screenshot of code snippet from the linked sillytavern-to-sharegpt application
description: |
  A TypeScript application that converts SillyTavern chat logs into formats suitable for LLM fine-tuning and sharing.
tags:
  - Dev
  - Tool
---

When working with LLMs and fine-tuning, sometimes you use a model for a while, and you think to yourself "Wow! This was great! I wish I could implement this in a future dataset!".

Well, now you can! Using [sillytavern-to-sharegpt](https://github.com/AAbushady/sillytavern-to-sharegpt) allows for easy conversion of chats into your desired format, whether that be Alpaca, ShareGPT, or something entirely different. Adding new formats is quite simple as well, thanks to each conversion type being it's own typescript file, allow for separation of concerns and clarity when coding for each type.
