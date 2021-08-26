const nodeHtmlToImage = require('node-html-to-image')
const swig = require('swig')

swig.setFilter('isObject', (element) => {
	return typeof element == "object";
});
swig.setFilter('isArray', (element) =>  {
	return Array.isArray(element);
});
swig.setFilter('date', (value) =>  {
	const date = new Date(value);
	const time = date.getHours() 
	? ' ' + (date.getHours() || '00') 
	+ ':' + (date.getMinutes() || '00')
	: ''
	return date.getDate() 
	+ '/' + (date.getMonth() + 1)  
	+ '/' + (date.getYear() - 100)
	+ time
});

// render template with props
module.exports = async (file, params) => {
  const compiled = swig.compileFile(file)
  const tpl = compiled(params)
	return image = await nodeHtmlToImage({
			html: tpl
	})

}