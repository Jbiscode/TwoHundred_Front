const PostButton = ({className, children, ...props}) => {
    return (
      <button
      className={`btn btn-ghost text-white mb-10 ${className}`}
      {...props}
  >
      {children}
  </button>
    )
}

export default PostButton;