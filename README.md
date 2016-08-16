# tiny-conf-plugin-file

Will store the content of `filepath` JSON to the given `tiny-conf` store

### Usage
```js
const path = require('path');
const conf = require('tiny-conf');

const filepath = path.join('path', 'to', 'a', 'config.json');
require('tiny-conf-plugin-file')(conf, filepath);
```


### Example
Config file `./path/to/config.json`:
```json
{
  "foo": "bar",
  "baz": {
    "one": 42,
    "two": ["Hello", "World"]
  }
}
```
Application `./app.js`:
```js
const path = require('path');
const conf = require('tiny-conf');
const filepath = path.join('path', 'to', 'config.json');

require('tiny-conf-plugin-file')(conf, filepath);

conf.get('foo');     // 'bar'
conf.get('baz.one'); // 42
conf.get('baz.two'); // ['Hello', 'World']
```
