#jQuery Plugin to Vehicle (car) number vizualization#

###How to install###
1. Add to `bower.json` of your project:
```javascript
{
	// ...
	"dependencies": {
		// ...
		"jquery.vehicle-number": "git://github.com/DenisIzmaylov/jquery.vehicle-number.git"
	}
}
```

2. Run `bower install`.
3. To any place at your HTML (just for example!):
```html
<link href="path/to/plugin/css/jquery.vehicle-number.css" rel="stylesheet" />
<script src="path/to/plugin/js/jquery.vehicle-number.js"></script>
<script src="javascript">
	
	$(document).ready(function () {
		
		$('#container').VehicleNumber({
			
			number: 'а123ра',
			district: '77',
			style: 'small'
			
		}).on('click', function () {
			
			$(this).VehicleNumber('destroy');
			
		});
	
	});
	
</script>
```