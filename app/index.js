const component  = () =>  {
  var element = document.createElement('div');
  element.innerHTML = _.merge(['Hello', 'webpack'], ' ');
  return element;
}
