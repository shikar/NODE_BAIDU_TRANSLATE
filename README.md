# Translate Baidu
free baidu translate

## Change Log
- [changelog.md](https://github.com/shikar/NODE_BAIDU_TRANSLATE/blob/master/CHANGELOG.md)


## Features

- Auto language detection
- Spelling correction
- Language correction
- Fast and reliable – it uses the same servers that [fanyi.baidu.com](https://fanyi.baidu.com) uses

## Install
```
npm install --save translate-baidu
```

## Usage

``` js
const translate = require('translate-baidu')

translate('hello').then(res => {
    console.log(res)
}).catch(err => {
    console.error(err)
})

// => { from: "en", to: "zh", dst: "你好", src: "hello" }
```

## API

### translate(text, options)

#### text
Type: `string`
The text to be translated

#### options
Type: `object`

##### from
Type: `string` Default: `auto`
The `text` language. Must be `auto` or one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/shikar/NODE_BAIDU_TRANSLATE/blob/master/src/languages.js)

##### to
Type: `string` Default: `en`
The language in which the text should be translated. Must be one of the codes/names (not case sensitive) contained in [languages.js](https://github.com/shikar/NODE_BAIDU_TRANSLATE/blob/master/src/languages.js).

##### full
Type: `Boolean` Default: false
Return to the Full Baidu translation result object

### Returns an `object`:

- `text` *(string)* – The translated text.

``` js
translate('Hello world', {from: 'en', to: 'nl'}).then(res => {
    console.log(res);
    //=> { from: "en", to: "zh", dst: "你好，世界", src:"Hello world"}
}).catch(err => {
    console.error(err);
});
```

## License

MIT © [Shikar](qzh.shi@gmail.com)
