/* eslint-disable */
const createCategoryDtoInType = shape({
  name: uu5String(255).isRequired(),
  desc: uu5String(4000),
  glyphicon: uri()
});
