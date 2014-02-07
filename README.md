Piano 4 The Draw
============

This is the github repository for the "connect four" assignment in Client Side Web Engineering. The authors of this application are Thomas Esterer, Lukas Mayerhofer and Jan Heinrich Veit. This version currently works locally for two players on the same computer because of the missing server.


Features
-----------

* browser client connect four game
* boardsize 8 x 8 (but can be adapted quadratic through variable)
* two player are fighting each other ...
* ... locally because of missing server (as mentioned in the mail from February 3th)
* works with the following browsers: IE (>= 9 without compatibility mode), chrome, safari, firefox
* can be played via touch devices (smartphone, tablets)
* HTML5 (Audio Element), CSS3
* works with SASS as pre-processor for CSS
* with included grunt tasks for serve and build (css minifiy, javscript minify and merge, ...)


Live-Version
-----------

You can find a live version for two players on the same computer on heroku: http://piano-4-the-draw.herokuapp.com/


Local-Version
-----------

If you want to serve this application on your computer, just execute the following steps:

1. `git clone https://github.com/rhythm-section/vier-gewinnt.git`
2. `cd vier-gewinnt/`
3. `npm install`
4. `bower install`
5. `grunt serve or grunt build`
