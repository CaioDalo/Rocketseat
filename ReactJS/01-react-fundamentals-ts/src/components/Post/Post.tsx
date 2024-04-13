import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { format, formatDistanceToNow, Locale } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Avatar } from "../Avatar/Avatar";
import { Comment } from "../Comment/Comment";

import styles from "./Post.module.css";

interface Author {
	avatarUrl: string;
	name: string;
	role: string;
}

interface Content {
	type: "paragraph" | "link" | "hashtags";
	text: string;
}

export interface PostType {
	id: number;
	author: Author;
	content: Content[];
	publishedAt: Date;
}

interface PostProps {
	post: PostType;
}

export function Post({ post }: PostProps) {
	const [comments, setComments] = useState(["Post show de bola"]);

	const [newComment, setNewComment] = useState("");

	const publishedDateFormatted = format(
		post.publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR as unknown as Locale,
		}
	);

	const relativeDateToNow = formatDistanceToNow(post.publishedAt, {
		locale: ptBR as unknown as Locale,
		addSuffix: true,
	});

	const handleCreateNewComment = (event: FormEvent) => {
		event.preventDefault();
		setComments([...comments, newComment]);
		setNewComment("");
	};

	const handleNewCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		event.target.setCustomValidity("");
		setNewComment(event.target.value);
	};

	const deleteComment = (commentToDelete: string) => {
		const commentsWithoutDeletedOne = comments.filter(
			(comment) => comment !== commentToDelete
		);
		setComments(commentsWithoutDeletedOne);
	};

	const handleNewCommentInvalid = (
		event: InvalidEvent<HTMLTextAreaElement>
	) => {
		event.target.setCustomValidity("Campo obrigatório");
	};

	const isNewCommentEmpty = newComment.length === 0;

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={post.author.avatarUrl} alt="Avatar" />
					<div className={styles.authorInfo}>
						<strong>{post.author.name}</strong>
						<span>{post.author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={post.publishedAt.toISOString()}
				>
					{relativeDateToNow}
				</time>
			</header>

			<div className={styles.content}>
				{post.content.map((item) => {
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
					onInvalid={handleNewCommentInvalid}
					required
				/>

				<footer>
					<button type="submit" disabled={isNewCommentEmpty}>
						Comentar
					</button>
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
