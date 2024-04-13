import { useState } from "react";
import { ThumbsUp, Trash } from "phosphor-react";

import styles from "./Comment.module.css";
import { Avatar } from "../Avatar/Avatar";

export function Comment({ content, onDeleteComment }) {
	const [likeCount, setLikeCount] = useState(0);

	function handleDeleteComment() {
		onDeleteComment(content);
	}

	function handleLikeComment() {
		setLikeCount((state) => {
			return state + 1;
		});
	}

	return (
		<div className={styles.comment}>
			<Avatar src="https://www.github.com/CaioDalo.png" hasBorder={false} />

			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<time
								title="28 de Fevereiro às 14:58h"
								dateTime="2024-02-28 14:57:00"
							>
								Cerca de 1h atrás
							</time>
						</div>

						<button onClick={handleDeleteComment} title="Deletar comentário">
							<Trash size={24} />
						</button>
					</header>

					<p>{content}</p>
				</div>

				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}
