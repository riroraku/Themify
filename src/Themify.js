/* MIT License
 *
 * Copyright (c) 2024 riroraku
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

!function(global, factory) {
	"use strict";
	global.Themify = factory;
}(this, (function() {
	/* Themify.js default theme template. The initial values
	 * are null, which is to be assigned later. Can be also
	 * overridable by external scope.
	 */
	var default_template = {
		DARKEN10: null,
		DARKEN20: null,
		DARKEN30: null,
		DARKEN40: null,
		DARKEN50: null,
		DARKEN60: null,
		DARKEN70: null,
		DARKEN80: null,
		DARKEN90: null,
		DARKEN100: null,
		LIGHTEN10: null,
		LIGHTEN20: null,
		LIGHTEN30: null,
		LIGHTEN40: null,
		LIGHTEN50: null,
		LIGHTEN60: null,
		LIGHTEN70: null,
		LIGHTEN80: null,
		LIGHTEN90: null,
		LIGHTEN100: null,
	};
	for(var r in default_template) {
		Object.defineProperty(default_template, r, {
			configurable: true,
			writable: false
		});
	}
	/* This is where the custom theme is stored of while
	 * the other which is available in default themes will
	 * be overrided its value. This will also store the default
	 * templates from default_template variablr
	 */
	var custom_template = {};
	var _ = {
		version: "1.0.0",
		root: document.body.children,
		themed_element: [],
		element_theme: [],
		base_theme_color: [],
		theme_attr: "data-theme"
	};
	/* Collection of properties for the Themify.js
	 * This properties are configured to be non-
	 * writable, ensuring the return values' integrity
	 */
	var _themify = {
		version: _.version,
		themedElements: null,
		theme: function theme( custom_theme ) {
			if(custom_theme !== undefined) {
				if(typeof custom_theme === "function") {
					var e = {
						fx: color_treatment,
						modified: {}
					};
					custom_theme(e);
					if(Object.keys(e.modified).length == 0) throw new Error("in callback(e), e.modified should not be empty");
					for(var [key, val] of Object.entries(e.modified)) {
						if(key in default_template) default_template[key] = val;
						else custom_template[key] = val;
					}
				}
				else if(typeof custom_theme === "string" && custom_theme.indexOf("#") == 0 && custom_theme != "") {
					_.element_theme = [];
					_.base_theme_color = extract_color(custom_theme);
					Object.defineProperty(this, "baseColor", {
						configurable: true,
						enumerable: true,
						value: (function() {
							var e = "#";
							_.base_theme_color.forEach(function(value) {
								var h = (value >>> 0).toString(16);
								e += h.length == 1 ? "0" + h : h;
							});
							return e;
						})(),
						writable: false
					});
				}
				conv(get_themed_elements(_.root));
				apply_theme();
			}
		},
		TEMPLATES: default_template,
		update: function update() {
			var v = get_themed_elements(_.root);
			_.themed_element = v.elements;
			_.element_theme = v.themes;
		}
	};
	Object.defineProperties(_themify, {
		version: { configurable: false, writable: false },
		theme: { configurable: false, writable: false },
		TEMPLATES: { configurable: false, writable: false, enumerable: false },
		update: { configurable: false, writable: false }
	});
	var color_treatment = {
		darken: function darken( percent ) {
			var percent = percent / 100;
			var bc = _.base_theme_color;
			var r = Math.floor(bc[0] - bc[0] * percent).toString(16);
			var g = Math.floor(bc[1] - bc[1] * percent).toString(16);
			var b = Math.floor(bc[2] - bc[2] * percent).toString(16);
			
			return ((r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b));
		},
		lighten: function lighten( percent ) {
			var percent = percent / 100;
			var bc = _.base_theme_color;
			var max = Math.max(...bc);
			var r = Math.floor(bc[0] == max ? max : bc[0] + ((max - bc[0]) * percent)).toString(16);
			var g = Math.floor(bc[1] == max ? max : bc[1] + ((max - bc[1]) * percent)).toString(16);
			var b = Math.floor(bc[2] == max ? max : bc[2] + ((max - bc[2]) * percent)).toString(16);
			
			return ((r.length == 1 ? "0" + r : r) + (g.length == 1 ? "0" + g : g) + (b.length == 1 ? "0" + b : b));
		}
	};
	
	function apply_theme() {
		Object.assign(default_template, custom_template);
		var el = _.themed_element;
		var th = _.element_theme;
		
		for(var i = 0; i < el.length; i++) {
			style(el[i], th[i])
		}
	}
	
	function style(el, theme) {
		for(var [k, v] of Object.entries(theme)) el.style[k] = v;
	}
	
	function extract_color( k ) {
		var temp = [];
		var trimmed = k.split("#")[1];
		var hex_color = Number("0x" + trimmed);
			if(trimmed.length == 3) {
				temp.push(Number("0x" + trimmed[0]));
				temp.push(Number("0x" + trimmed[1]));
				temp.push(Number("0x" + trimmed[2]));
			}
		if(trimmed.length == 6) temp = rgb24(hex_color);
		return temp;
	}
	
	function rgb24( hex_color ) {
		var r_color = hex_color >>> 16;
		var g_color = (hex_color << 16) >>> 24;
		var b_color = (hex_color << 24) >>> 24;
		return [r_color, g_color, b_color];
	}
	
	function get_theme(element) {
		var attr_val = element.getAttribute(_.theme_attr);
		return (attr_val != "" ? attr_val : undefined);
	}
	
	function conv( kl ) {
		var reg = /([bt])([ld]\d+)/;
		for (var e of kl.themes) {
			var s = e.split(",");
			var g = {};
			s.forEach(function(a) {
				var i = a.match(reg);
				var t = Number(i[2].match(/\d+/));
				t = (t == 100 ? 100 : t);
				if (i[2][0] == "l") g[(i[1] == "b" ? "background" : i[1] == "t" ? "color" : null)] = "#" + color_treatment.lighten(t);
				if (i[2][0] == "d") g[(i[1] == "b" ? "background" : i[1] == "t" ? "color" : null)] = "#" + color_treatment.darken(t);
			});
			_.element_theme.push(g);
		}
	}
	
	function get_themed_elements( root ) {
		var themed_elements = [];
		var theme_val = [];
		for(var e of root) {
			if(!(e instanceof (HTMLScriptElement || HTMLHeadElement || HTMLPreElement || HTMLHtmlElement || HTMLStyleElement || HTMLLinkElement || HTMLTitleElement || HTMLMetaElement))) {
				var t = get_theme(e);
				if(t != undefined) {
					themed_elements.push(e);
					theme_val.push(t);
				}
				if(e.children.length > 0) {
					var o = get_themed_elements(e.children).elements;
					for(var c of o) {
						var g = get_theme(c);
						if(g != null && g != undefined) {
							themed_elements.push(c);
							theme_val.push(g);
						}
					}
				}
			}
		}
		return { elements: themed_elements, themes: theme_val };
	}
	//_themify.prototype.TEMPLATES = default_template;
	/* Initializes Themify.js, all elements inside the scope
	 * of the `document.body` will be initialized and stored
	 * for future use, such as applying dynamic custom theme
	 */
	function themify() {
		var t = get_themed_elements(_.root);
		if(Object.keys(_.themed_element).length == 0 && Object.keys(_.element_theme).length == 0) {
			_.themed_element = t.elements;
			Object.defineProperty(_themify, "themedElements", {
				value: t.elements.length,
				configurable: true, 
				writable: false
			});
		}
		return _themify;
	}
	return themify();
})());