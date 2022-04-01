# AnkiDroid js addon asciimath
Type less and use addon to convert to math jax

Convert ASCII math notation and (some) LaTeX to Presentation MathML

## Install
View installation instructions [here](https://github.com/krmanik/ankidroid-js-addon#how-to-install-addons)

## Usage
1. Open note editor
2. Type equation (not mathjax but equation like in calculator)
3. Click bottom ```Σ``` (Sigma) button to convert

## Example
[Fourier transform](https://en.wikipedia.org/wiki/Fourier_transform)

![](https://github.com/krmanik/ankidroid-js-addon/blob/main/images/Fourier_transform_eq1.svg)

```
hat f \(xi)=int_(-infty)^(infty)f(x)e^(-2pi i x xi)dx
```

Converted to MathJax using js addon

```
\(\hat{{f}}{\left(\xi\right)}={\int_{{-\infty}}^{{\infty}}}{f{{\left({x}\right)}}}{e}^{{-{2}\pi{i}{x}\xi}}{\left.{d}{x}\right.}\)
```

## Learn more
- http://asciimath.org/
- https://en.wikipedia.org/wiki/AsciiMath

## Demo
<img src="https://raw.githubusercontent.com/krmanik/ankidroid-js-addon/main/images/demo_ascii_math.gif" height=450></img>

*Note: ```i``` is missing in equation in above image.*

## License and Credits
### asciimathml
The project use following projects to convert asciimath to mathjax.
- https://github.com/asciimath/asciimathml
- https://github.com/asciimath/asciimathml/tree/master/asciimath-based

Copyright (c) 2014 Peter Jipsen and other ASCIIMathML.js contributors
<br>
MIT License

### ankidroid-js-addon-asciimath
Mani
<br>
MIT License