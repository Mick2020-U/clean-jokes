/* eslint-disable */
const createJokeDtoInType = shape({
  name: string(255).isRequired(),
  text: string(4000).isRequired(),
  categoryList: array(mongoId(), 10)
});


const jokeListDtoInType = shape({
    sortBy: oneOf(["name", "rating"]),
    order: oneOf(["asc", "desc"]),
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer()
  })

});

const updateJokeDtoInType = shape({
  id: mongoId().isRequired(),
  name: uu5String(255),
  text: uu5String(4000)
});

const deleteJokeDtoInType = shape({
  id: mongoId().isRequired()
});