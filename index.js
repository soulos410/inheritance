function BaseClass(data) {
    this.data = data;
    this.runQueue = [];
}
BaseClass.prototype.plus = function () {
    this.runQueue.push(this._plus.bind(this, Array.prototype.slice.call(arguments)));
    return this;
}
BaseClass.prototype._plus = function (data, previousData) {
    return data.reduce(function (acc, el) {
        return acc += el;
    }, previousData);
}
BaseClass.prototype.get = function () {
    this.data = this.runQueue.reduce(function (acc, func) {
        return func(acc);
    }, this.data);
    this.runQueue = [];
    return this.data;
}

class IntBuilder extends BaseClass {
    constructor(data = 0) {
        super(data);
    }
    random(from, to) {
        this.runQueue.push(IntBuilder._random.bind(null, from, to));
        return this;
    }

    static _random(from, to) {
        return Math.floor(Math.random() * (to - from)) + from;
    }

    minus(...data) {
        this.runQueue.push(IntBuilder._minus.bind(null, data));
        return this;
    }

    static _minus(data, previousData) {
        const sum = data.reduce((acc, el) => {
            return acc + el;
        });
        return previousData - sum;
    }

    multiply(multiplyer) {
        this.runQueue.push(IntBuilder._multiply.bind(null, multiplyer));
        return this;
    }

    static _multiply(multiplyer, previousData) {
        return previousData * multiplyer;
    }

    divide(divider) {
        this.runQueue.push(IntBuilder._divide.bind(null, divider));
        return this;
    }

    static _divide(divider, previousData) {
        return parseInt(previousData / divider);
    }

    mod(divider) {
        this.runQueue.push(IntBuilder._mod.bind(null, divider));
        return this;
    }

    static _mod(divider, previousData) {
        return previousData % divider;
    }
}

function StringBuilder(data) {
    BaseClass.call(this, data || '');
}
StringBuilder.prototype = Object.create(BaseClass.prototype);
StringBuilder.prototype.constructor = StringBuilder;

StringBuilder.prototype.minus = function (charsNumber) {
    this.runQueue.push(this._minus.bind(this, charsNumber));
    return this;
};

StringBuilder.prototype._minus = function (charsNumber, previousData) {
    return previousData.slice(0, previousData.length - charsNumber);
};

StringBuilder.prototype.multiply = function (multiplyer) {
    this.runQueue.push(this._multiply.bind(this, multiplyer));
    return this;
};

StringBuilder.prototype._multiply = function (multiplyer, previousData) {
    var result = '';
    for (var i = 0; i < multiplyer; i++) {
        result += previousData;
    }
    return result;
};

StringBuilder.prototype.divide = function (charsNumber) {
    this.runQueue.push(this._divide.bind(this, charsNumber));
    return this;
};

StringBuilder.prototype._divide = function (charsNumber, previousData) {
    return previousData.slice(0, Math.floor(previousData.length / charsNumber));
};

StringBuilder.prototype.remove = function (stringToRemove) {
    this.runQueue.push(this._remove.bind(this, stringToRemove));
    return this;
};

StringBuilder.prototype._remove = function (stringToRemove, previousData) {
    var tempArr = previousData.split('');
    var result = '';
    for (let i = 0; i < tempArr.length; i++) {
        if (tempArr[i] !== stringToRemove) {
            result += tempArr[i];
        }
    }
    return result;
};

StringBuilder.prototype.sub = function (from, to) {
    this.runQueue.push(this._sub.bind(this, from, to));
    return this;
};

StringBuilder.prototype._sub = function (from, to, previousData) {
    if (from === to) return previousData[from];
    return previousData.substring(from, to);
};
