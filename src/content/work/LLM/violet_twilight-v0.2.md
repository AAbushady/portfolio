---
title: Violet Twilight v0.2
publishDate: 2024-09-12 00:00:00
img: \assets\P962FQhRG4I8nbU_DJolY.png
img_alt: White haired anime girl with a stalf and a green scarf, dressed in a monk garb. She stands infront of a violet tinted moon with a cloudy backdrop.
description: |
  A fine-tuned language model optimized for local deployment on consumer hardware, providing strong performance for conversational AI applications without requiring expensive cloud infrastructure.
tags:
  - LLM
---

[Violet Twilight v0.2](https://huggingface.co/Epiculous/Violet_Twilight-v0.2) is a model that I created using a mix of custom datasets as well as datasets that were held in high regard with the Local LLM community at the time. It's lineage comes from two LoRA finetunings of [mistralai/Mistral-Nemo-Base-2407](https://huggingface.co/mistralai/Mistral-Nemo-Base-2407), and a SLERP merge using [Mergekit](https://github.com/arcee-ai/mergekit). All finetuning was done with the tool [Axolotl](https://github.com/axolotl-ai-cloud/axolotl)

The first, [Crimson Dawn v0.2](https://huggingface.co/Epiculous/Crimson_Dawn-v0.2), was the result of training Roleplay data first without an instruct template. The goal of this approach was to shift the model away from the overbearing censorship that was more common in models of the time, as well as expose the base model to more complex and targeted roleplay scenarios. Finally a second LoRA finetuning was done over the resulting model, this time using a ChatML instruct template. The data for this training was more task and assistant oriented. However, custom data was created to create an "overlap" where the LLM was asked to Roleplay while completing the task. The thought behind this was to better blend the Roleplay data with the assistant data to create a model that would theoritically be capable of both, as well as increase overall coherence.

The second, [Azure Dusk v0.2](https://huggingface.co/Epiculous/Azure_Dusk-v0.2) was trained much the same way as it's sibling Crimson Dawn; the key difference being datasets used in reverse order, as well as the ChatML instruct template being included in both training runs. Both trainings were still LoRA finetunes, just as before.

The birth of this model originally came from an experiment to see which training approach would yield the stronger model. When both parent models produced solid results, the idea was presented to merge the two models. This resulted in a model that seemed exceed both in terms of utility and enjoyment.
