 {% import "./cells.tpl" as cells%}
<html>
 <div>
	<h1> Your activity in {{total.month}} month </h1>
	<table>
		<tr>
			{% for header in headers %}
				<th>{{header}}</th>
			{% endfor %}
		</tr>
		{% for item in allItems %}
			<tr>
				{% for header in headers %}

					<!--DATE -->
					{% if header=='createdAt' %}
						{{cells.date(item[header])}}

					<!--TAG -->
					{% elseif header === 'tags' %}
						{{cells.tag(item[header])}}


					<!--ELSE -->
					{% elseif item[header]|isObject %}
						<td>
							{{item[header].name}}
						</td>
					{% else %}
						<td>
							{{item[header]}}
						</td>
					{% endif %}
				{% endfor %}
			</tr>
		{% endfor %}
	</table>
	<table>
		<tr>
			{% for totalHeader in totalHeaders %}
				<th>{{totalHeader}}</th>
			{% endfor %}
		</tr>
		{% for price in total.totalPrice %}
			<tr>
				{% for totalHeader in totalHeaders %}
					<td> {{price[totalHeader]}} </td>
				{% endfor %}
			</tr>
		{% endfor %}
	</table>
 </div>
</html>

<style>
body {
	color: #fff;
	background-color: rgb(12, 11, 65);
	padding: 20px;
}
table {
	width: 80%;
	border-radius: 15px;
	box-shadow: 1px 1px 25px 20px  rgba(54, 53, 99, 0.411);
	background-color: rgb(1, 0, 51);
	margin: auto;
	color: #fff;
	border-collapse: collapse;
}
td{
	border-bottom: 1px solid rgba(255, 255, 255, 0.253);
	height: 50px;
	text-align: center;
}
tr:last-child td {
	border-bottom: none;
}

</style>