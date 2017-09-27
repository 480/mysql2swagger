/**
 * Spec parser.
 * @memberof module:mysqlspec/lib/parsing
 * @inner
 * @constructor SpecParser
 */

"use strict";


/** @lends SpecParser */
function SpecParser(config) {
    var s = this;
}

SpecParser.prototype = {
    /**
     * Parse desc for table.
     */
    parseTableDesc: function (name, desc) {
        var s = this,
            required = [],
            properties = {};
        Object.keys(desc).forEach(function (key) {
            var col = desc[key];
            if (s._parseRequired(col)) {
                required.push(key);
            }
            properties[key] = {}
            Object.assign(properties[key], s._parseType(col));
        });
        var return_spec = {};
        return_spec[name] = s._cleanEmptyProperty({
            description: name,
            properties: properties,
            required: required
        });
        return return_spec;
    },
    _cleanEmptyProperty: function (data) {
        Object.keys(data).forEach(function (key) {
            var isEmpty = (key === undefined) || (key === null) || (key === '');
            if (isEmpty) {
                delete data[key];
            }
        });
        return data;
    },
    _parseRequired: function (col) {
        return col.Null === 'NO';
    },
    _parseMaxlength: function (col) {
        var type = col.Type;
        if (!type) {
            return undefined;
        }
        var matched = type.match(/\((\d+)\)/);
        return matched ? Number(matched.pop()) : undefined;
    },
    _parseType: function (col) {
        var s = this;
        var type = col.Type;
        if (!type) {
            return {type:undefined};
        }
        var mysqlType = type.replace(/\([\d,]+\)/, '').toUpperCase().split(' ').shift();
        var maxLength = s._parseMaxlength(col);

        if( mysqlType.indexOf('ENUM(') >= 0 ) {
            var enums = undefined;
            try {
                var enums = JSON.parse(mysqlType.replace('ENUM','').replace('\'','"').replace('(','[').replace(')',']'));
            }
            catch(e) {}
            return {
                type: 'string',
                enum: enums,
                description: col.Comment
            }
        }

        switch (mysqlType) {
            case 'LONGTEXT':
            case 'MEDIUMTEXT':
            case 'TEXT':
            case 'TINYTEXT':
            case 'VARCHAR':
            case 'CHAR':
                return {
                    type:'string',
                    default: col.Default,
                    maxlength: maxLength,
                    description: col.Comment
                };
            case 'TINYINT':
            case 'SMALLINT':
            case 'MEDIUMINT':
            case 'INT':
            case 'BIGINT':
                return {
                    type:'integer',
                    default: col.Default,
                    maximum: maxLength,
                    description: col.Comment
                };
            case 'FLOAT':
            case 'DOUBLE':
            case 'DECIMAL':
            case 'NUMERIC':
                return {
                    type:'number',
                    default: col.Default,
                    maximum: maxLength,
                    description: col.Comment
                };
            case 'DATE':
            case 'DATETIME':
            case 'TIMESTAMP':
                return {
                    type:'string',
                    format:'date',
                    default: col.Default,
                    description: col.Comment
                };
            case 'LONGBLOB':
            case 'MEDIUMBLOB':
            case 'TINYBLOB':
                return {
                    type:'string',
                    default: col.Default,
                    maxlength: maxLength,
                    description: col.Comment
                };
            default:
                return {
                    type: mysqlType,
                    default: col.Default,
                    maxlength: maxLength,
                    description: col.Comment
                }
        }
    }
};

module.exports = SpecParser;