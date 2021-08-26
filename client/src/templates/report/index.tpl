 {% import "./cells.tpl" as cells%}
<html>
	<table>
		<tr>
			{% for header in headers %}
				<th>{{header}}</th>
			{% endfor %}
		</tr>
		{% for item in data %}
			<tr>
				{% for header in headers %}
					{% if header=='createdAt' %}
						{{cells.date(item[header])}}
					{% elseif item[header]|isArray %}
						<td>
							{% for val in item[header] %}
								<span>
									{{val.name}} 
								</span>
							{% endfor %}
						</td>
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
	<!---<table>
		<tr>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
		</tr>
		<tr>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
		</tr>
		<tr>
			<td>1</td>
			<td>1</td>
			<td>1</td>
			<td>1</td>
		</tr>
	</table> ---> 
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