Introduction

Seasons is a personal project on mine while trying to learn javascript. I have a background in Java so transitioning over to Javascript was a slightly easier task. I wanted to create a dynamic background for each season with an animation of falling objects on a static background.

Snowflakes

Learning everything from scratch, my first notion was to create an updating canvas where each falling object would update its position based on a function. This worked with a setInterval function.The most difficult part, however was to make the snowflake rotate as it falls. 

After many tries, I got rotation to work by rotating the entire canvas, drawing in the image of a snowflake and rotating back, esstentially rotating the snowflake. However, this caused the image to be rotated on its upper left corner instead of its center. 

This was eventually fixed by shifting the image up and left by half its height and width respectively.

The snowflake image was difficult to create because having white space around the snowflake didn't work well with a background. I created a program to detect white pixles (red > 235, green > 235, blue > 235) and change the alpha value to 0, making it complete transparent.

Finally, I created a snowflake class. I has a constructer that takes in random size, position, angle, fade speed, and more. I capped a limit of 800 snowflakes in an array and generated them all at each time step. Snowflakes that reached the bottom or faded out were replaced with new ones.

Background and snowflake was found on google images.


Leaves

Falling leaves is similar to snowflakes and used most of its structure including rotation method and class. Because the leaves are in autumn, I wanted to create leaves that were multicolored, ranging from bright green and red and have a gradient. 

It took awhile to understand how to manipulate pixels and generate separate leaf instances with varying colors.

I also wanted the leaves to have a swaying motion white falling. This was done using a modified sine function and having the rotational axis above of the image.

Because mutating the pixels of the leaves and generating images is very time consuming, I generated 100 leaves initially and reposition a leaf to the top with alpha 1 if it dropped below the canvas height or alpha level.

Background and leaf was found on google images. 