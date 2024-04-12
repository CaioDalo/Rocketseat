import { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

import styles from "./Post.module.css";

export function Post({ author, content, publishedAt }) {
	const [comments, setComments] = useState(["Post show de bola"]);

	const [newComment, setNewComment] = useState("");

	const publishedDateFormatted = format(
		publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR,
		}
	);

	const relativeDateToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});

	const handleCreateNewComment = (event) => {
		event.preventDefault();
		setComments([...comments, newComment]);
		setNewComment("");
	};

	const handleNewCommentChange = (event) => {
		setNewComment(event.target.value);
	};

	const deleteComment = (commentToDelete) => {
		const commentsWithoutDeletedOne = comments.filter(
			(comment) => comment !== commentToDelete
		);
		setComments(commentsWithoutDeletedOne);
	};

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={author.avatarUrl} />
					<div className={styles.authorInfo}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={publishedAt.toISOString()}
				>
					{relativeDateToNow}
				</time>
			</header>

			<div className={styles.content}>
				{content.map((item) => {
					switch (item.type) {
						case "paragraph":
							return <p key={item.text}>{item.text}</p>;
						case "link":
							return (
								<p key={item.text}>
									<a href="#">👉 &nbsp; {item.text}</a>
								</p>
							);
						case "hashtags":
							return <p key={item.text}>{item.text}</p>;
						default:
							return null;
					}
				})}
			</div>

			<form
				onSubmit={(event) => handleCreateNewComment(event)}
				className={styles.commentForm}
			>
				<strong>Deixe seu comentário</strong>
				<textarea
					name="comment"
					placeholder="Deixe seu comentário"
					value={newComment}
					onChange={handleNewCommentChange}
				/>

				<footer>
					<button type="submit">Comentar</button>
				</footer>
			</form>

			<div className={styles.commentsList}>
				{comments.map((comment) => (
					<Comment
						key={comment}
						content={comment}
						onDeleteComment={deleteComment}
					/>
				))}
			</div>
		</article>
	);
}
