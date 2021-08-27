{% macro date(value) %}
	<td>
		{{ value|date }}
	</td>
{% endmacro %}

{% macro tag(tags) %}
	<td class="conteiner-tags">
		{% for tag in tags %}
			<span class="tag" style="
				background-color:{{tag.color}}
			">
				{{tag.name}} 
				{{tag.icon}} 
			</span>
		{% endfor %}
	</td>

		<style>
		.conteiner-tags{
			
		}

		.tag{
			padding: 10px;
			margin: 5px;
			border-radius: 5px;
			box-shadow: 0 0 1px 4px rgba(129, 129, 189, 0.1);
		}
		</style>
{% endmacro %}