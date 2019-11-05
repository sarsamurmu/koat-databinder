# Koat DataBinder
Easily bind your data with HTML. HTML will Rerender when data changes and only changes the DOM Node which necessary.

### Importing
#### Using CDN
Add this your HTML file
```html
<script src="https://cdn.jsdelivr.net/gh/sarsamurmu/koat-databinder@{version}/dist/koat-databinder.js">
```
Replace `{version}` with latest version tag. See releases for latest version.
#### Using npm
Install it using npm
```
npm i sarsamurmu/koat-databinder#{version}
```
Replace `{version}` with latest version tag.

Use it -

CommonJS/ES5:
```js
var DataBinder = require('koat-databinder')
```
ES6:
```js
import DataBinder from 'koat-databinder'
```
### Usage
Just make an simple HTML file with placeholders.
```html
<div id="changeable">
  <p>His name is {:name:}</p>
  <p>His age is {:age:}</p>
</div>
```
As you can see you can define placeholders using {:data:}.

Then in script use it like this
```js
// new DataBinder(element, dataObject)
var dataBinder = new DataBinder(document.querySelector('#changeable'), {
  name: 'Septo Zepto',
  age: 35
});

// Then connect with the data with element
dataBinder.connect();
```
[CodePen Example](https://codepen.io/sarsamurmu/pen/mddxPme)

Now you can see your HTML page with the given data! Open your console and enter `dataBinder.age = 37`, you can see your data changed in your page without rerendering the whole DOM.

There are few more methods available
```js
// Disconnect with element, element will not update when data changes
dataBinder.disconnect();

// When Disconnected, to update your element with current data
dataBinder.update();
```

In your HTML, you can even use inline functions with placeholder data. Like so
```html
<div id="changeable">
  <p>His name is {:name.toUpperCase():}</p>
  <p>His age is {:age - 10:}</p>
  <!-- Assume your data includes `graduated = true` -->
  <p>He is {:graduated ? 'Graduated' : 'Still not graduated':}</p>
</div>
```
[CodePen Example](https://codepen.io/sarsamurmu/pen/RwwMagP)

If you want more control over HTML, you can do so, you've to just return a HTML string in self executing function
```js
// Set an Array in our data
dataBinder.set('favFruits', ['Apple', 'Mango', 'Watermelon']);
// NOTE: set function in only necessary when setting direct data it's not necessary for nested data.
```
```html
<div id="changeable">
  <p>His name is {:name:}</p>
  <p>His age is {:age:}</p>
  <br>
  <span>His Favorite Fruits are</span>
  <ul>
    {:
      (() => {
        let htmlStr = ``;
        favFruits.forEach((fruit) => {
          htmlStr += `<li>${fruit}</li>`
        });
        return htmlStr
      })()
    :}
  </ul>
</div>
```
[CodePen Example](https://codepen.io/sarsamurmu/pen/eYYMZEj)

You can see your favorite fruits listed. You can do whatever, just return a HTML string, that's it.

If you are setting attribute of an element using placeholder you can use `a{:variable:}` placeholder which transforms into `variable="valueOfVariable"`. Like so
```js
// Set src as variable
dataBinder.set('src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/600px-JavaScript-logo.png')
```
```html
<div id="changeable">
  <p>JavaScript Logo</p>
  <img a{:src:} width="300px">
</div>
```
[CodePen Example](https://codepen.io/sarsamurmu/pen/XWWEdzy)

#### Use of `set` method
All data are saved as Proxy but direct child can't use the feature of Proxy.
```js
var dataBinder = new DataBinder(document.querySelector('#changeable'), {
  name: 'Septo Zepto',
  age: 35,
  nestedData: {
    someData: 'someData'
  }
});

// If you use this
dataBinder.weight = '70kg'
// data can't be reactive, whenever you change the data element won't update

// If you use this
dataBinder.nestedData.weight = '70kg'
// because you're setting the data in a nested object it will be reactive, whenever you update the data, element's will update too.

// To fix first case we can use this instead
dataBinder.set('weight', '70kg');
// Now when you update the data, element will update too.
```

## License
MIT [License](https://github.com/sarsamurmu/koat-databinder/blob/master/LICENSE.md).
