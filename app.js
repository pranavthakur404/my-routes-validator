import mongoose from "mongoose";

export const validator = (options) => {
  return (req, res, next) => {
    const routeOptions = options[req.path];

    if (!routeOptions || routeOptions.length === 0) {
      return next();
    }

    const errors = [];

    if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push({
        field: "id",
        message: "Invalid MongoDB ObjectId",
      });
    }

    for (const rule of routeOptions) {
      const fieldValue = req.body[rule.field];

      if (!fieldValue && rule.message) {
        errors.push({ field: rule.field, message: rule.message });
        continue;
      }

      if (rule.min && fieldValue < rule.min) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should be at least ${rule.min}`,
        });
      }

      // Validation for decimal up to 2 places
      if (rule.decimal2 && !/^\d+(\.\d{1,2})?$/.test(fieldValue)) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should have up to 2 decimal places`,
        });
      }

      // Validation for decimal up to 6 places
      if (rule.decimal6 && !/^\d+(\.\d{1,6})?$/.test(fieldValue)) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should have up to 6 decimal places`,
        });
      }

      if (rule.max && fieldValue > rule.max) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should be at most ${rule.max}`,
        });
      }

      if (rule.minLength && fieldValue.length < rule.minLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should be at least ${rule.minLength} characters`,
        });
      }

      if (rule.maxLength && fieldValue.length > rule.maxLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} should be at most ${rule.maxLength} characters`,
        });
      }

      if (rule.email && !/^\S+@\S+\.\S+$/.test(fieldValue)) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be a valid email`,
        });
      }

      if (rule.pattern && !new RegExp(rule.pattern).test(fieldValue)) {
        errors.push({
          field: rule.field,
          message: `${rule.field} does not match the required pattern`,
        });
      }

      if (rule.numeric && isNaN(Number(fieldValue))) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be a numeric value`,
        });
      }

      if (rule.boolean && typeof fieldValue !== "boolean") {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be a boolean value`,
        });
      }

      if (rule.date && isNaN(Date.parse(fieldValue))) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be a valid date`,
        });
      }

      if (
        rule.custom &&
        typeof rule.custom === "function" &&
        !rule.custom(fieldValue)
      ) {
        errors.push({
          field: rule.field,
          message: `${rule.field} failed custom validation`,
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};
