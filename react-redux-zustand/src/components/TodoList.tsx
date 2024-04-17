import { userAppSelector } from "../store";

export function TodoList() {
	const todos = userAppSelector((store) => store.todo);

	return (
		<ul>
			{todos.map((todo) => (
				<li>{todo}</li>
			))}
		</ul>
	);
}
