# Visual style decision

Given that we can't use most of the Space Station 14 art and content, and we need to draw and create our own content, we have the option to set our own visual style from the beginning. All CrystallEdge14 art design must follow the rules below:

### Color Palette

Deviations from the palette in colors and shades are allowed, but the basic materials must adhere to this file.
For tiles, it is preferable to use more monotonous and non-distinctive colors, as they are considered background objects.

![pallete](https://github.com/user-attachments/assets/e96d01f8-b90d-4688-8eaa-1102b472c3ab)

## Style
### Light & Shadows
One of the main challenges in creating a sprite is understanding the overall style. This section is closely intertwined with the next, so it is recommended that they be considered together.

The style does not imply strong realism, and gradients of dozens of shades. For each main color in the sprite should be selected from 5 to 10 shades (More than 7 in rare cases and if you know how to use them), which will be distributed on the sprite according to the following scheme:

1. **Highlight:** The center of the user's attention, the intensity of the glare depends on the material of the object. Most often marks the transition from the top to the side plane and does not take up much space.
2. **Light:** After the glare, the lightest part of the sprite. Most often indicates the upper plane of the subject.
3. **Neutral:** The “original” shade. Most often other shades are built from it and it is used in conjunction with them.
4. **Shade:** An intermediate shade between shadow and neutral. Most often used to soften the shadow in combination with other shades and to indicate a side plane.
5. **Shadow:** The darkest part of the sprite. Most often used to border/fill the sprite in the darkest areas.

The other shades require the ability to use them correctly without causing unnecessary gradients/blurring on the sprite. This scheme works in 90% of sprite cases for our build.

The material of the sprite is also taken into account. Looking at the existing palette, you can see that on metals the glare is brighter and more strongly emphasized than on other materials. You should think about these things when painting.

![light2-export](https://github.com/user-attachments/assets/36ae3e04-ac65-4345-9064-1ed910ee806d)

On our project, the style provides the main light source above the sprite itself. The light falls perpendicularly downward.

![light-export](https://github.com/user-attachments/assets/dd1b0ca8-ca98-420c-82cd-3f5afe571992)

### Perspective

Only sprites with a perspective of 3\4 are allowed. From this perspective, only the front and top of the object are in the player's field of view.

![image](https://github.com/crystallpunk-14/crystallpunk-docs/assets/132602258/b646fd3a-96c8-4909-b7a6-c840387e725f)

This rule applies most strongly to large objects and structures where the overall shape of the geometry is fairly simple (cube, sphere).
Examples of how the perspective works:

![perspective-export](https://github.com/user-attachments/assets/e4f9787f-eb34-4704-9f4a-5c0078a0e041)

For small objects / objects with complex shape / exceptional cases, deviations from this rule are allowed.

### Human model

Also adjusted to the perspective and the clothes on her should be appropriate.

We have 2 types of doll: 32x32 and 48x48. For most cases you will need the first option, but if the sprite is too big, you can take the 48x48 resolution.
Examples of clothes and dolls:

![clothing](https://github.com/user-attachments/assets/0cc26c17-c7dd-4cea-b443-ed39c0143601)
![image](https://github.com/Agoichi/crystallpunk-docs-AGOICHI/assets/92464780/d05cae30-f4f6-46f8-b25e-c080375815be)

## Extras:
### Outline
The outline of any given thing needs contrast with __nearly__ pixels to the dark side.
Overly dark/light outline are errors.
**Example:**

![outline-export](https://github.com/user-attachments/assets/40c535ec-572d-4d10-bfbc-9e92dc802ffb)


### Banding
Banding is some cases of drawing pixels close together, repeating the shape. This can make the sprite appear blurry and the stroke overly bold.

![image](https://github.com/user-attachments/assets/63686eb1-1c00-4994-9f5f-3e1770a7a29e)
![image](https://github.com/user-attachments/assets/8fca8041-6cdb-4d2d-a9f6-7bb93e9d0c5d)


### Shape

Every object has a distinct shape. No matter how complex the shape and volume of an object are, they can always be reduced to a set of simple geometric primitives. At the very beginning of the work draw simple geometric shapes, it can be a ball, cylinder, pyramid, etc., but in almost any situation can help the simplest cube. Using the tools copy, select and transform assemble your object from the primitives. And only after the object is made up of primitives can you add color and other details.

![image](https://github.com/user-attachments/assets/5ec0b74e-3b58-46fb-8990-395faf75d3d0)
