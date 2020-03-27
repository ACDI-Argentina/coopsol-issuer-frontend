export const dateFormat = 'YYYY-MM-DD';
export const iconColor = 'rgba(0,0,0,.25)';

export const defaultInputProperties = inputTexts => ({
  key: inputTexts.name,
  name: inputTexts.name,
  placeholder: inputTexts.placeholder,
  label: inputTexts.label,
  classNameDiv: inputTexts.name,
  type: 'string',
  rules: [],
  formItem: {}
});

export const defaultTitleProperties = title => ({
  key: title,
  classNameDiv: title,
  title,
  component: 'customDiv'
});
