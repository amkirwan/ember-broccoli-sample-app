var Base = DS.Model.extend({
  color: DS.attr('string')
});

Base.FIXTURES = [
  {id: 1, color: 'red'},
  {id: 2, color: 'yellow'},
  {id: 3, color: 'green'}
]

export default Base;
