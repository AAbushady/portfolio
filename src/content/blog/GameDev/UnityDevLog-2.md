---
title: "Unity Dev Log #2"
description: "Transformation and Weapons: The Beginning"
publishDate: 2025-10-11 00:00:01
tags: ["Game Dev", "Unity", "C#"]
status: "draft"
img: |
---

Today's blog post the focus will be on the [WeaponsTest](/work/unity/weaponstest) project and the work I've done so far in creating a virtual firing range to test Transformation and Weapons systems of the player vehicle.

![GIF transforming into and out of "robot mode"](/assets/UnityDevLog-1/WeaponsTestTransform.gif)

Starting this time around I primarily focused on getting the aiming in a good spot; I wanted to start with using the mouse to aim the robot making it face the direction of wherever the player was aiming. Beginning with a Raycast from the main camera, I was able to achieve the desired effect of "facing" where I'm aiming. This was great! However, I hit a couple of small snags with my original implementation. When I tried to aim at the sky, or past my character I couldn't achieve the desired effect; additionally, aiming at the edge of my Player prefab caused it to spin erratically! Not ideal...

To solve the sky aiming issue, I opted to use a "fallback". Essentially what we're doing is if the Raycast doesn't have a valid "hit" we'll create a "farpoint" vector which we can then use to calculate the direction we would have used with the Raycast hit. This solved a good chunk of the issues, but there was still the problem of "self" hits. Wanting to continue using the "Raycast" approach, I opted for taking an array of Raycast hits as opposed to just the first hit and decide "valid" hit on the first hit that wasn't the Player itself OR a child of it. This will help when things like missles are being fired about by the player to avoid destroying your own ordinance.

![GIF showing Raycast aiming in action]()

There are of course still more optimzations that can be done, and even right away I'd argue the use of "magic numbers" on the 100f should probably be a settable property on the script itself; but here is a code snippet of the HandleMouseLook() method used in aiming.

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