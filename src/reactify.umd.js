/*!
 * @file Reactify.js
 * @description Микро-библиотека на чистых прототипах для реактивных событий (Event Emitter)
 * @version 1.1.0
 * @author minoyo flybuk@icloud.com
 * @license MIT
 * @homepage https://minoyo.click
 * 
 * Copyright (c) 2026 minoyo
 * Released under the MIT License
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.Reactify = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    function Reactify() {
        if (!(this instanceof Reactify)) return new Reactify();
        this.listeners = {};
        this.history = {};
    }

    Reactify.prototype.on = function (eventName, fn) {
        const [name, namespace] = eventName.split('.');
        if (!name) return this;

        this.listeners[name] = this.listeners[name] || [];

        const listenerWrapper = (data) => fn(data);
        listenerWrapper._originalFn = fn;
        if (namespace) listenerWrapper._ns = namespace;

        this.listeners[name].push(listenerWrapper);
        return this;
    }

    Reactify.prototype.once = function (eventName, fn) {
        const [name, namespace] = eventName.split('.');
        if (!name) return this;

        this.listeners[name] = this.listeners[name] || [];

        const listenerWrapper = (data) => fn(data);
        listenerWrapper._originalFn = fn;
        listenerWrapper._once = true;
        if (namespace) listenerWrapper._ns = namespace;

        this.listeners[name].push(listenerWrapper);
        return this;
    }

    Reactify.prototype.when = function (eventName, fn) {
        const [name] = eventName.split('.');
        if (this.history[name] && this.history[name].fired) {
            fn(this.history[name].data);
        } else {
            this.once(eventName, fn);
        }
        return this;
    }

    Reactify.prototype.emit = function (eventName, data = {}) {
        const [name] = eventName.split('.');
        this.history[name] = { fired: true, data };

        if (!this.listeners[name]) return this;

        const currentListeners = [...this.listeners[name]];
        currentListeners.forEach(fn => fn(data));

        this.listeners[name] = this.listeners[name].filter(listener => !listener._once);

        return this;
    }

    Reactify.prototype.off = function (eventName, fn) {
        if (typeof eventName !== 'string' || !eventName.trim()) return this;

        const [name, namespace] = eventName.split('.');

        if (name && !this.listeners[name]) return this;

        if (!name && namespace) {
            for (let key in this.listeners) {
                this.listeners[key] = this.listeners[key].filter(listener => listener._ns !== namespace);
            }
            return this;
        }

        if (!fn && !namespace) {
            this.listeners[name] = [];
            return this;
        };

        this.listeners[name] = this.listeners[name].filter(listener => {
            const matchFn = fn ? (listener === fn || listener._originalFn === fn) : true;
            const matchNs = namespace ? listener._ns === namespace : true;
            return !(matchFn && matchNs);
        });

        return this;
    }

    Reactify.prototype.has = function (eventName) {
        const [name] = eventName.split('.');
        return !!(this.listeners[name] && this.listeners[name].length);
    }

    Reactify.prototype.clear = function () {
        this.listeners = {};
        this.history = {};
        return this;
    }

    return Reactify;
}));