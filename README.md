# LightingBolt
Experiment on making lighting bolt like realistic

This is my own experiment on making Lighting Bolt with Canvas.

There is special javascript function drawlinebetween(x1,y1,x2,y2) which make animating lighting bolt between two points of canvas.
And also here are some special values for configure bolt parametrs such as width, color, boldness and etc.
The comments on code is written in uzbek language, but here I'm going to give some comments here in English:

There are in initial part (at the beginning) given some parameters, this parameters control the animation process:

(actually you can set it as given in the code, but you can change also.
If you don't want to change, then you can use only drawlinebetween function only, with some parameters)

num_bubbles=10 // this is number of balls which inside canvas
br=5 // radius of balls, if it is 0 then balls aren't visible
max_dist=150 // The maximum distance which two balls can make a lighting bolt

//This variables are for controlling lighting bolt effect
lW=5 // maximum width of lines for making bolt, if it is 5 then width of lines can be vary on lineWidth=[0..5]
num_of_lines=5 // Number of lines for making lighting bolt effect, if it is higher value bolt will be more stronger

//Actually this part is not to change, it is parameters for making lines in various was
const min_points=3 // line break points (minimal)
const max_points=10 // line break points (maximum)
//Line parameters (some parameters are random, so we need to set only minimum and maximum values)
const min_alfa=0 // opacity of line (minimal)
const max_alfa=0.9 // opacity of line (maximal)
//Color of line
const r=162 // red value
const g=253 // green value
const b=253 // blue value
//width of bolt, actually it depends on distance, if distance is longer, width of bolt between two points will be higher,
but sometimes, we have very long distance between two points or very small
In this situation width will be much higher or smaller, so we need to limitate the width so here are some values
const min_hw=8 // minimum width
const max_hw=12 // maximum width
