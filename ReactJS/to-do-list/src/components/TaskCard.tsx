import { Trash } from "@phosphor-icons/react";
import styles from "./TaskCard.module.css";

interface TaskCardProps {
	task: string;
	completed?: boolean;
	deleteTask: (task: string, completed: boolean) => void;
	handleCompleteTask: (task: string) => void;
}

export function TaskCard({
	task,
	completed = false,
	deleteTask,
	handleCompleteTask,
}: TaskCardProps) {
	return (
		<li className={styles.taskCard}>
			<button
				className={completed ? styles.checkButtonCompleted : styles.checkButton}
				onClick={() => handleCompleteTask(task)}
				dangerouslySetInnerHTML={{ __html: completed ? "&#10003;" : "" }}
			></button>
			<p className={completed ? styles.taskCompleted : styles.task}>{task}</p>
			<button
				className={styles.deleteButton}
				onClick={() => deleteTask(task, completed)}
			>
				<Trash size={24} />
			</button>
		</li>
	);
}
