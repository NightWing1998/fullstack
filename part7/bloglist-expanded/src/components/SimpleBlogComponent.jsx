import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
	<div className="blog">
		<ToggleComponent>
			<div className="blog__header">
				{blog.title} {blog.author}
			</div>
			<div className="blog__body">
				blog has {blog.likes} likes
			<button onClick={onClick}>like</button>
			</div>
		</ToggleComponent>
	</div>
)

const ToggleComponent = props => {
	const [visible, setVisible] = React.useState(false);

	const style = { display: visible ? "block" : "none" };

	const toggleVisible = () => setVisible(!visible);

	return (
		<div className="toggleComponent">
			<div className="static" onClick={toggleVisible}>
				{props.children[0]}
			</div>
			<div className="dynamic" style={style}>
				{props.children[1]}
			</div>
		</div>
	)
}

export default SimpleBlog