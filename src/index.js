const { dt, getType, types } = require('./utils');
const morphdom = require('morphdom').default;

class DataBinder {
  constructor(element, data) {
    // Our private data should not be enumerable, So it won't show up in for in loop
    Reflect.defineProperty(this, dt, {
      value: {},
      writable: true,
      enumerable: false,
      configurable: false
    });

    this[dt].element = element;
    this[dt].binderData = {};
    this[dt].baseHTML = element.outerHTML
      .repeat(1)
      .trim()
      .replace('(<(pre|script|style|textarea)[^]+?<\/\2)|(^|>)\s+|\s+(?=<|$)', '$1$3')
      .replace(/&gt;/g, ">")
      .replace(/\{:(.*?):\}=[\"\']{2}/g, '{:$1:}');
    this[dt].connected = false;

    // Our Basic Proxy Handler for All Proxies
    this[dt].proxyHandler = {
      get: (target, key) => {
        return Reflect.get(target, key)
      },
      set: (target, key, value) => {
        Reflect.set(target, key, this[dt].getProxiefied(value));
        if (this[dt].connected) this.update();
        return true
      }
    }

    // To proxiefy whole object
    this[dt].proxiefy = (obj) => {
      Object.keys(obj).forEach((key) => {
        let type = getType(obj[key]);
        if (type === types.Object) {
          this[dt].proxiefy(obj[key]);
          obj[key] = new Proxy(obj[key], this[dt].proxyHandler);
        }
        if (type === types.Array) {
          for (var i = 0; i < obj[key].length; i++) {
            let type = getType(obj[key][i]);
            if (type === types.Object || type === types.Array) {
              this[dt].proxiefy(obj[key][i]);
              obj[key][i] = new Proxy(obj[key][i], this[dt].proxyHandler);
            }
          }
          obj[key] = new Proxy(obj[key], this[dt].proxyHandler);
        }
      })
    }

    // Get the proxiefied value if possible
    this[dt].getProxiefied = (dataObj) => {
      let type = getType(dataObj);
      if (type === types.Object || type === types.Array) {
        this[dt].proxiefy(dataObj);
        return new Proxy(dataObj, this[dt].proxyHandler)
      }
      return dataObj
    }

    // Setup the Basic Watcher System
    this[dt].setupWatcher = (obj) => {
      if (obj === undefined) return;
      Object.keys(obj).forEach((key) => {
        // Get proxified data if possible
        this[key] = this[dt].binderData[key] = this[dt].getProxiefied(obj[key]);
        Reflect.defineProperty(this, key, {
          enumerable: true,
          configurable: true,
          get: () => {
            return this[dt].binderData[key];
          },
          set: (value) => {
            this[dt].binderData[key] = this[dt].getProxiefied(value);
            if (this[dt].connected) this.update();
            return true
          }
        })
      })
    }

    // Set the data up for first time
    this[dt].setupWatcher(data);

    // JSON Stringify replacer
    this[dt].JSONreplacer = (key, value) => {
      if (typeof value === 'function') return value.bind(this)();
      return value;
    }

    // Our let string which is used in functions
    this[dt].updateLetString = () => {
      this[dt].letString = "";
      Object.keys(this).forEach((key) => {
        this[dt].binderData[key] = this[key];
        var keyData = JSON.stringify(this[dt].binderData[key], this[dt].JSONreplacer);
        this[dt].letString += `let ${key} = ${keyData};`;
      });
    }

    // To get HTML with new data used
    this[dt].getNewHTML = () => this[dt].baseHTML
      .replace(/a\{:(.*?):\}/g, (match, offset, string) => {
        var value = offset.trim();
        var resolve = new Function(`
          ${this[dt].letString}
          let __scrtVal__ = '${value}';
          try {
            __scrtVal__ += '="'+${value}+'"'
          } catch (e) {
            console.warn(e.toString());
            __scrtVal__ = ''
          }
          return __scrtVal__`);
        return resolve();
      })
      .replace(/\{:((\s|.)*?):\}/gm, (match, offset, string) => {
        var value = offset.trim();
        var resolve = new Function(`
          ${this[dt].letString}
          let __scrtVal__ = '';
          try {
            __scrtVal__ = ${value}
          } catch (e) {
            console.warn(e.toString());
            __scrtVal__ = ''
          }
          return __scrtVal__`);
        return resolve();
      });
  }

  update() {
    this[dt].updateLetString();
    morphdom(this[dt].element, this[dt].getNewHTML(), {
      onBeforeElUpdated: function(fromEl, toEl) {
        if (fromEl.isEqualNode(toEl)) return false;
        return true
      }
    })
  }

  set(key, value) {
    this[dt].binderData[key] = this[dt].getProxiefied(value);

    Reflect.defineProperty(this, key, {
      enumerable: true,
      configurable: true,
      get: () => {
        return this[dt].binderData[key];
      },
      set: (val) => {
        this[dt].binderData[key] = this[dt].getProxiefied(val);
        if (this[dt].connected) this.update();
        return true
      }
    })
  }

  connect() {
    this[dt].connected = true;
    this.update();
  }

  disconnect() {
    this[dt].connected = false;
  }
}

module.exports = DataBinder
