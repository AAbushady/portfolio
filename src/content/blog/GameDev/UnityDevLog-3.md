---
title: "Unity Dev Log #3"
description: "Open Fire! Time for weapons!"
publishDate: 2025-10-18 07:48:00
tags: ["Game Dev", "Unity", "C#"]
status: "draft"
---

Hey readers! Remember when I said we'd be adding weapons? Well, bullets are working now... after some interesting failures along the way. Kicking things off I added some rudimentary bullets in the form of a capsule prefab to [WeaponsTest](/work/unity/weaponstest). Why bullets? Well imagine this! Driving down the track your opponent overtakes you and you want to pester them, so you pull behind them and just start shooting. Their car/mech is losing health so they switch to mech form and fire off a volley of missiles! Reflexively you transform in turn and begin shooting missiles out of the sky with these light machine gun bullets.

Conceptually awesome, right? Great way to attack and defend. Well on my first implementation it was also a great way to have your driver play "Clothes Dryer Simulator"...

![GIF of bullet causing car to flip around](/assets/UnityDevLog-3/WeaponsTestBulletMishap.gif)

Luckily, the fix is super simple! And a core feature of Unity, so neat! Setting IsTrigger on the bullet collider let the bullet fly through and not impact the player shooting. Sadly I did lose the neat visual aspect of bullets making the NPC target knock around on impact. With that done, I moved on to switching from Spacebar to fire to what I felt was more natural for this use case, left mouse button to fire. I set up a rapid fire when you hold down the button! Except... it was too rapid... you know that game "Snake" it basically looked like that was coming out of my mech and flying into my opponent! Not machine gun fire at all... This one was a pretty simple fix too honestly though, a simple delay (based on time of course to account for framerate differences!) allowed me to make more realistic machine gun fire!

```csharp
// SimpleGun.cs
private float lastFireTime;
private float delayTime = 1.0f;

void Update()
{
    if (Input.GetMouseButton(0) && Time.time >= lastFireTime + (delayTime / fireRate))
    {
        Fire();
    }
}

void Fire()
{
    GameObject childObject = null;

    if (bulletPrefab != null)
    {
        Quaternion aimDirection = transform.rotation; // Default to forward direction

        if (transform.childCount > 0)
        {
            AimingController aimingController = transform.GetChild(0).GetComponent<AimingController>();
            if (aimingController != null && aimingController.playerCamera != null)
            {
                aimDirection = Quaternion.LookRotation(aimingController.GetAimDirection());
            }

            childObject = transform.GetChild(0).gameObject;

            Vector3 bulletSpawnPoint = childObject.transform.position + childObject.transform.forward * 2;

            if (muzzleFlash != null)
            {
                Instantiate(muzzleFlash, bulletSpawnPoint, aimDirection);
            }

            GameObject newBullet = Instantiate(bulletPrefab, bulletSpawnPoint, aimDirection);

            // should set shooter to child of Player
            newBullet.GetComponent<Projectile>().SetShooter(childObject);

            lastFireTime = Time.time + (delayTime / fireRate);
        }
    }
    else
    {
        Debug.LogWarning("Bullet prefab not assigned!");
    }
}
```

In case you were worried about "do the bullets just spawn together", no worries there! I handled it in the Projectile script using a "lifetime" property!. This allows configurable lifetimes for different projectiles!

```csharp
// Projectile.cs
void Update()
{        
    // Check lifetime
    if (Time.time - spawnTime >= lifetime)
    {
        Destroy(this.gameObject);
    }
}
```

Great, fixed! Except now I noticed that if I'm rapid firing and I switch forms, a valid action, NULL reference errors abound! Whoopsie... transforming breaks the parent link to the shooter logic which we use to prevent shooting yourself... Ok, time to break out the big guns; pun absolutely intended. We need to make some broader changes and refactor the system a bit. Better to find that out now of course rather than when it's polish time!

I hear you asking, "okay, so what was this refactor" and "must have been crazy right?". Well no! It was actually quite simple. An empty parent GameObject to house the car and mech modes. Then I just had to make sure each component was sitting on the right GameObject (Gun and Transform on the parent; Aiming goes to each mode's Object) and of course references in the code. Part of that is actually visible in the previous code block where you can see me checking the count of children.

With that solved, I moved on to enhance the aiming. In the last blog, I had locked and flattened the Y-axis. Undoing that, while allowing for aiming at the sky did make things awkward in that the whole "robot" block would tilt. I kind of felt like this was okay for now in a prototype though, ideally we'd have multiple parts make up the mech with independent pitch, and yaw movement to make that look more visually appealing.

![GIF of robot tilting while shooting](/assets/UnityDevLog-3/WeaponsTestTilt.gif)

So, remember that whole we lose the punch of the bullets by turning on "Is Trigger"? Next up, I fixed that! When I'm playing a game with gunplay one thing I'm not a huge fan of is floaty weapons that don't really look like they do anything. I like my guns punchy and impactful (think Call of Duty Modern Warfare 1 remake). Granted I'm not quite that level yet, I like to think I did a good job restoring SOME of the impact of the bullet... literally!

Two important parts were needed for this. A way to trigger impact effects on the bullets, and of course a Muzzle Flash! I experimented with the impact a bit and created my own simple prefab so I could see what that was like. For the muzzle flash though... that one I wanted to experience playing around with Unity Assets so I outsourced to a free package. [War FX by Jean Moreno](https://assetstore.unity.com/packages/vfx/particles/war-fx-5669) which was extremely well done by the way! Fantastic free asset pack!
```csharp
// Projectile.cs
void OnTriggerEnter(Collider other)
{
   HandleImpact(other.gameObject, transform.position);
}

void OnCollisionEnter(Collision collision)
{
    HandleImpact(collision.gameObject, collision.GetContact(0).point);
}

private void HandleImpact(GameObject hitObject, Vector3 impactPoint)
{
    // Only check parent if shooter still exists
    if (shooter != null)
    {
        if (hitObject == shooter || hitObject.transform.IsChildOf(shooter.transform))
        {
            return; // Ignore collision with shooter or its children
        }
    }

    // Hit something valid (or shooter was destroyed, treat as valid hit)
    Debug.Log($"Bullet hit: {hitObject.name}");
        
    if (impactEffect != null)
    {
        Instantiate(impactEffect, impactPoint, Quaternion.identity);
    }

    Destroy(this.gameObject);
}
```

```csharp
// SimpleGun.cs
// Fire() method

if (muzzleFlash != null)
{
    Instantiate(muzzleFlash, bulletSpawnPoint, aimDirection);
}

GameObject newBullet = Instantiate(bulletPrefab, bulletSpawnPoint, aimDirection);
```

Being new to 3rd party Asset packs though... I did run into a little hiccup. My muzzle flashes wouldn't self destroy! I double, then triple checked. Opened the prefab, box was unchecked for "Looping" "Stop Action" was "Destroy" I kept looking and looking trying different durations and things. Silly me I didn't realize EACH CHILD of the prefab ALSO has to be changed for "Looping" and "Stop Action". Well now I know, and you do too if you didn't!

All that said, that wraps up simple gunfire in WeaponsTest! We can now shoot our light machine gun style bullets and they impact the game world! Some performance optimizations I can hit on in the future, I did notice a bit of a possible memory leak on the bullets and muzzle flashes. I'm going to need to look at that of course, implementing object pooling would go a long way.

![GIF of firing effects](/assets/UnityDevLog-3/WeaponsTestBulletsGO.gif)