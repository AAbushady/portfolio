---
title: "Unity Dev Log #2"
description: "Transformation and Weapons: The Beginning"
publishDate: 2025-10-11 07:48:00
tags: ["Game Dev", "Unity", "C#"]
status: "published"
---

Today's blog post the focus will be on the [WeaponsTest](/work/unity/weaponstest) project and the work I've done so far in creating a virtual firing range to test Transformation and Weapons systems of the player vehicle.

![GIF transforming into and out of "robot mode"](/assets/UnityDevLog-1/WeaponsTestTransform.gif)

In my last dev log, I implemented a rudimentary transformation from car to robot mode, something simple that just swapped prefabs, nothing crazy yet! Now I need to start getting this robot(block) combat ready. Before I can create weapons, I need to get an aiming foundation set up. As mentioned in the last blog, WeaponsTest maintains the idea of creating multiple projects to prototype systems and incorporating them into the main game later down the line for a cleaner, and easier way to iterate.

Starting this time around I primarily focused on getting the aiming in a good spot; I wanted to start with using the mouse to aim the robot making it face the direction of wherever the player was aiming. Beginning with a Raycast from the main camera, I was able to achieve the desired effect of "facing" where I'm aiming. This was great! However, I hit a couple of small snags with my original implementation. When I tried to aim at the sky, or past my character I couldn't achieve the desired effect; additionally, aiming at the edge of my Player prefab caused it to spin erratically! Not ideal...

To solve the sky aiming issue, I opted to use a "fallback". Essentially what we're doing is if the Raycast doesn't have a valid "hit" I'll create a "farpoint" vector which I can then use to calculate the direction we would have used with the Raycast hit. This solved a good chunk of the issues, but there was still the problem of "self" hits. Wanting to continue using the "Raycast" approach, I opted for taking an array of Raycast hits as opposed to just the first hit and decide "valid" hit on the first hit that wasn't the Player itself OR a child of it. This will help when things like missiles are being fired about by the player to avoid destroying your own ordnance.

![GIF showing Raycast aiming in action](/assets/UnityDevLog-2/WeaponsTestAiming.gif)

Some tech debt to acknowledge that can be quickly fixed is the use of magic numbers for the 100f of calculating the "farpoint" variable. Ideally you'd want to expose the variable to unity, allowing designers to change the variable without a code change; a common pattern within Unity.

```csharp
void HandleMouseLook()
{
    Vector3 targetPosition;
    RaycastHit? validHit = null;
    Vector3 mousePosition = Input.mousePosition;
    Ray aimingRay = playerCamera.ScreenPointToRay(mousePosition);

    // Debug: visualize the ray in Scene view
    Debug.DrawRay(aimingRay.origin, aimingRay.direction * 100f, Color.red);

    // Get ALL hits along the ray
    RaycastHit[] hits = Physics.RaycastAll(aimingRay, Mathf.Infinity);

    foreach (RaycastHit hit in hits)
    {
        if (hit.collider.gameObject != gameObject && !hit.transform.IsChildOf(transform))
        {
            validHit = hit;
            break;
        }
    }

    if (validHit.HasValue)
    {
        targetPosition = new Vector3(validHit.Value.point.x, transform.position.y, validHit.Value.point.z);
    }
    else
    {
        Vector3 farPoint = aimingRay.origin + aimingRay.direction * 100f;
        targetPosition = new Vector3(farPoint.x, transform.position.y, farPoint.z);
    }

    transform.LookAt(targetPosition);
}
```

Initially, I was a bit concerned about doing the RaycastAll and having an array of hits to go through, but breaking out of the loop after a valid hit and leaving early should help any performance issues we would have had looping through EVERY Raycast hit otherwise. Basically get a valid hit and move on with our lives! This also makes sense, if we're "firing" on something, we would want to interact with the game object at that first valid hit; think about it "Oh I'm firing my machine gun to stop these missiles from hitting my mech", or "I'm firing on my opponent" you aren't trying to necessarily shoot everything in the path even the stuff behind it, and from gameplay/balance perspective you probably don't want it to work that way either. 

Ultimately I really like this solution as it avoids some of the pitfalls I would be concerned with using layers in a multiplayer setting. In the layer approach we run into a conceptual problem, multiplayer requires everyone be able to hit opponent colliders but avoid their own when aiming/firing. If you were to ignore a "self" layer you run into the problem of all players not being able to hit anything, since they are ignoring layer of "self" which also applies to their opponents! The Raycast and filter method felt much more scalable and easier to maintain as I grow this system to be part of my main game.

One of the last challenges I faced with aiming was getting the car to face the correct direction after transforming back from robot mode. From a gameplay perspective, imagine switching to robot mode to either take a defensive action on incoming ordnance or pester a leading driver to your right. You take a few potshots and switch back to car to speed ahead when suddenly your car is facing the wrong direction! It's moving you in the direction you were aiming earlier! Suddenly you're careening off the track and crashing into a wall. Doesn't sound ideal does it?

```csharp
if (newMode == VehicleMode.Car)
{
    Camera mainCamera = Camera.main;
    if (mainCamera != null)
    {
        Vector3 cameraForward = mainCamera.transform.forward;
        cameraForward.y = 0; // Flatten to horizontal plane
        if (cameraForward.sqrMagnitude > 0.001f) // Avoid zero-length vector
        {
            currentRotation = Quaternion.LookRotation(cameraForward);
        }
    }
}
```

A simple addition to the "SwapToPrefab()" method in the TransformationController was all it took, just make sure the car is aiming at camera forward, and we're good to go! Now if I want to take shots at someone overtaking me, I can do so without worrying about inadvertently throwing the race for vengeance!

Now that I have a great foundation in place for aiming, it's time to open fire next! Building on the Raycast aiming, I can focus on implementing basic machine gun fire, some rudimentary visuals, and visual feedback on hits, maybe some shaking of target game objects as well. Above all else, it should be satisfying to use!