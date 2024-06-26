# Themify
Themify.js is mini library for themify elements! Specifying only its base color and completely change its appearance depending on your query.

## Syntax
Themify's syntax is simple just a line of code.

```javascript
Themify.theme( <string>base_color )
```
`base_color` - 24-bit color scheme string

## Methods and attributes
* `Themify.baseColor` - <string> returns base color supplied
* `Themify.theme( base_color )` - sets base theme color
* `Themify.themedElements` - <number> returns number of elements that has `data-theme` attribute
* `Themify.TEMPLATES` - <object>, list of color treatments template
* `Themify.version` - <string>

## How to use
Elements that has `data-theme` attribute and is not empty, will be listed and changed depending on the value.

`data-theme` possible values:
* **b{l | d}** - represents the background color, either be followed by 'l' or 'd'
* **t{l | d}** - represents the color, either be followed by 'l' or 'd'
* **l{1-100}** - apply lighten treatment to element, followed by percentage
* **d{1-100}** - apply darken treatment to element, followed by percentage
* **,** - separator

`data-theme` sample query:
```html
<!-- applies 90% lighten to background -->
<p data-theme="bl90">Only applies theme to background color</p>

<!-- applies 80% lighten to color -->
<p data-theme="tl80">Only applies theme to text color</p>

<!-- applies 78% lighten to background and 34% darken to text color -->
<p data-theme="bl78,td34">Applies theme both to background color and text color</p>

<!-- same function as above -->
<p data-theme="td67,bd56">Applies theme both to background color and text color</p>
```
## Additionals

Few examples

* normal usage
```html
	<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title></title>
			</head>
			<body>
				<!-- applies 90% lighten to background -->
				<p data-theme="bl90">Only applies theme to background color</p>
				<!-- applies 80% lighten to color -->
				<p data-theme="tl80">Only applies theme to text color</p>
				<!-- applies 78% lighten to background and 34% darken to text color -->
				<p data-theme="bl78,td34">Applies theme both to background color and text color</p>
				<!-- same function as above -->
				<p data-theme="td67,bd34">Applies theme both to background color and text color</p>
				<script src="../src/Themify.js">../src/Themify.js</script>
				<script>
					Themify.theme("#ff0000");
				</script>
			</body>
		</html>
```
* changing theme
```html
	<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title></title>
			</head>
			<body>
				<!-- applies 90% lighten to background -->
				<p data-theme="bl90">Only applies theme to background color</p>
				<!-- applies 80% lighten to color -->
				<p data-theme="tl80">Only applies theme to text color</p>
				<!-- applies 78% lighten to background and 34% darken to text color -->
				<p data-theme="bl78,td34">Applies theme both to background color and text color</p>
				<!-- same function as above -->
				<p data-theme="td67,bd34">Applies theme both to background color and text color</p>
				<button onclick="changeTheme()">Change Theme</button>
				<script src="../src/Themify.js">../src/Themify.js</script>
				<script>
					var theme = Themify;
					var theme_colors = ["#ff0000", "#00ff00", "#0000ff"];
					var i = 0;
					function changeTheme() {
						theme.theme(theme_colors[i]);
						i >= 2 ? i = 0 : i++;
					}
					changeTheme();
				</script>
			</body>
		</html>
```
* update element
```html
	<!DOCTYPE html>
		<html>
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<title></title>
			</head>
			<body>
				<!-- applies 90% lighten to background -->
				<p data-theme="bl90">Only applies theme to background color</p>
				<!-- applies 80% lighten to color -->
				<p data-theme="tl80">Only applies theme to text color</p>
				<!-- applies 78% lighten to background and 34% darken to text color -->
				<p data-theme="bl78,td34">Applies theme both to background color and text color</p>
				<!-- same function as above -->
				<p data-theme="td67,bd34">Applies theme both to background color and text color</p>
				<button onclick="createAndUpdate()">Create new themed element and update</button>
				<script src="../src/Themify.js">../src/Themify.js</script>
				<script>
					Themify.theme("#ff0000");
					function createAndUpdate() {
						var e = document.createElement("p");
						e.setAttribute("data-theme", "bd76,tl49");
						e.textContent = "appended element";
						document.body.appendChild(e)
						Themify.update();
						Themify.theme("#ff0000");
					}
				</script>
			</body>
		</html>
```

## To be added

- [ ] Elevation
- [ ] CSS properties (deals colors)
- [ ] Themify exclusive design templates

## License

```plain text
MIT License

Copyright (c) 2024 riroraku

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```