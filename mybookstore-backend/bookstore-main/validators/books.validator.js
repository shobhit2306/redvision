import validator from "../configuration/validation.config.js";
import APPSQUADZ from "../helpers/message.helper.js";

const { check } = validator,
  {
    VALIDATIONS: {
      NAME_ALPHA,
      NAME_REQ,
    },
  } = APPSQUADZ;

const name = check("name")
    .not()
    .isEmpty()
    .withMessage(NAME_REQ)
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage(NAME_ALPHA),
    author = check("author")
    .not()
    .isEmpty()
    .withMessage("author is a required field")
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage("Author should be in alphabets"),
    categories = check("categories")
    .not()
    .isEmpty()
    .withMessage("categories cant be empty")
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage("Select categories from dropdown"),
    description = check("description")
    .not()
    .isEmpty()
    .withMessage("Description required")
    .custom((value) => /^[a-zA-Z ]*$/.test(value))
    .withMessage("Description should be in alphabets"),
    price = check("price")
    .not()
    .isEmpty()
    .withMessage("Price is a required field")
    ,
  booksValidator = {
    name,
    author,
    categories,
    description,
    price
  };

export default booksValidator;
