import { ClipboardText, PlusCircle } from "@phosphor-icons/react";

import styles from "./ToDoList.module.css";
import { FormEvent, useState } from "react";
import { TaskCard } from "./TaskCard";

export function ToDoList() {
	const [tasks, setTasks] = useState<string[]>([]);
	const [newTask, setNewTask] = useState<string>("");
	const [completedTasks, setCompletedTasks] = useState<string[]>([]);

	const addNewTask = (event: FormEvent) => {
		event.preventDefault();
		setTasks([...tasks, newTask]);
		setNewTask("");
	};

	const deleteTask = (taskToDelete: string, completed?: boolean) => {
		if (completed) {
			const newCompletedTasks = completedTasks.filter(
				(task) => task !== taskToDelete
			);
			setCompletedTasks(newCompletedTasks);
		}
		if (!completed) {
			const newTasks = tasks.filter((task) => task !== taskToDelete);
			setTasks(newTasks);
		}
	};

	const completeTask = (completedTask: string) => {
		const newTasks = tasks.filter(
			(currentTask) => currentTask !== completedTask
		);
		setTasks(newTasks);
		setCompletedTasks([...completedTasks, completedTask]);
	};

	const uncompleteTask = (uncompletedTask: string) => {
		const newCompletedTasks = completedTasks.filter(
			(currentTask) => currentTask !== uncompletedTask
		);
		setCompletedTasks(newCompletedTasks);
		setTasks([...tasks, uncompletedTask]);
	};

	return (
		<article className={styles.toDoContainer}>
			<form
				className={styles.newTaskForm}
				onSubmit={(event) => addNewTask(event)}
			>
				<input
					className={styles.input}
					type="text"
					placeholder="Adicione uma nova tarefa"
					value={newTask}
					onChange={(event) => setNewTask(event.target.value)}
				/>
				<button className={styles.submit} type="submit">
					Criar
					<PlusCircle size={16} />
				</button>
			</form>

			<div>
				<header className={styles.listHeader}>
					<div className={styles.createdOnes}>
						<p>Tarefas criadas</p>
						<span className={styles.counter}>{tasks.length}</span>
					</div>
					<div className={styles.finishedOnes}>
						<p>Concluídas</p>
						<span className={styles.counter}>{completedTasks.length}</span>
					</div>
				</header>

				<ul className={styles.tasks}>
					{tasks.length
						? tasks.map((task: string) => (
								<TaskCard
									key={task}
									task={task}
									deleteTask={deleteTask}
									handleCompleteTask={completeTask}
								/>
						  ))
						: null}
					{completedTasks.length
						? completedTasks.map((task: string) => (
								<TaskCard
									key={task}
									task={task}
									deleteTask={deleteTask}
									handleCompleteTask={uncompleteTask}
									completed
								/>
						  ))
						: null}
				</ul>
				{!tasks.length && !completedTasks.length && (
					<div className={styles.noTasks}>
						<ClipboardText size={56} className={styles.icon} />
						<p className={styles.bold}>
							Você ainda não tem tarefas cadastradas
						</p>
						<p>Crie tarefas e organize seus itens a fazer</p>
					</div>
				)}
			</div>
		</article>
	);
}
