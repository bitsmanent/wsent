wsent
=====

A simple web presentation tool inspired by
[sent](http://tools.suckless.org/sent).

Note: this is a modified version of the [sent
readme](http://git.suckless.org/sent/tree/README.md).

wsent runs on a web browser, it uses plaintext files and images. Every line
represents a slide in the presentation. This may limit the use, but for
presentations using the [Takahashi
method](https://en.wikipedia.org/wiki/Takahashi_method) this is very nice and
allows you to write down the presentation for a quick lightning talk within a
few minutes.

The presentation is displayed in a simple page colored black on white for
maximum contrast even if the sun shines directly onto the projected image. The
content of each slide is automatically scaled to fit the window so you don't
have to worry about alignment. Instead you can really concentrate on the
content.

Demo
----

To get a little demo, just navigate to wsent.html with your browser and choose
the "example" file from the input field.

You can navigate with the arrow keys and quit with `q`.

Configuration
-------------

Edit wsent.html and change the config section to fit your needs.

Usage
-----

Use images by prepending a `@` before the filename. Lines starting with `#`
will be ignored. A presentation file could look like this:

	wsent
	takahashi
	why?
	@nyan.png
	easy to use
	no dependencies
	~100 lines of code
	how?
	browse to FILENAME
	one slide per line
	# This is a comment and will not be part of the presentation
	# The next line starts with a whitespace, it will not produce an image slide
	 @FILE.png
	thanks / questions?

future features
---------------

* cross-browser support
* multiple lines per slide?
* light colored background and table of contents
* second window for speakers laptop (progress, time, notes?)
* markdown?
