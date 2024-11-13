"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.validateIdProperty = validateIdProperty;
exports.validateModel = validateModel;
const validation_types_1 = require("./validation_types");
function validate(data, reqs) {
    let validatedData = {};
    Object.entries(reqs).forEach(([prop, rule]) => {
        const [valid, value] = applyRule(data[prop], rule);
        if (value) {
            validatedData[prop] = value;
        }
        else {
            throw new validation_types_1.ValidationError(prop, "Validations Error");
        }
    });
    return validatedData;
}
function applyRule(val, rule) {
    const required = Array.isArray(rule) ? true : rule.required;
    const checks = Array.isArray(rule) ? rule : rule.validation;
    const convert = Array.isArray(rule) ? (v) => v : rule.converter;
    if (val === null || val == undefined || val === "") {
        return [required ? false : true, val];
    }
    let valid = true;
    checks.forEach(check => {
        if (!check(val)) {
            valid = false;
        }
    });
    return [valid, convert ? convert(val) : val];
}
function validateIdProperty(val, v) {
    if (v.keyValidator) {
        const [valid, value] = applyRule(val, v.keyValidator);
        if (valid) {
            return value;
        }
        throw new validation_types_1.ValidationError("ID", "Validation Error");
    }
    return val;
}
// La función validationModel aplica las reglas para cada propiedad y luego aplica la regla de todo el modelo
function validateModel(model, rules) {
    if (rules.propertyRules) {
        model = validate(model, rules.propertyRules);
    }
    if (rules.modelRule) {
        const [valid, data] = applyRule(model, rules.modelRule);
        if (valid) {
            return data;
        }
        throw new validation_types_1.ValidationError("Model", "Validation Error");
    }
}
