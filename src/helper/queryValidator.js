const ObjectId = require('bson').ObjectId;
class queryValidator {
    static validate(values) {
        if (!values || values.length == 0) {
            throw new Error('please send valid values to be validated');
        }

        for (const elem of values) {
            let valid = false;

            switch (elem.type) {
                case types.number:
                    if (elem.value) {
                        if (this.isNumber(elem.value)) {
                            valid = true;
                        }
                    } else if (!elem.required) {
                        valid = true;
                    }
                    break;
                case types.ObjId:
                    if (elem.value) {
                        if (this.isObjectId(elem.value)) {
                            valid = true;
                        }
                    } else if (!elem.required) {
                        valid = true;
                    }
                    break;
                case types.date:
                    if (elem.value) {
                        if (this.isDate(elem.value)) {
                            valid = true;
                        }
                    } else if (!elem.required) {
                        valid = true;
                    }
                    break;
            }
            if (!valid) {
                return {
                    result: false,
                    elem_key: elem.key
                }
            }
        };
        return {
            result: true
        };
    }

    static isNumber(value) {
        return !isNaN(+value);
    }
    static isObjectId(value) {
        return ObjectId.isValid(!value ? value : value.toString());
    }
    static isDate(value) {
        return !isNaN(Date.parse(value));
    }
}

let types = {
    number: 1,
    ObjId: 2,
    date: 3
}

module.exports = queryValidator;
module.exports.types = types;