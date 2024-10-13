export default function Comment({ comment, onReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-start gap-3 text-sm">
        <Avatar>
          <AvatarFallback>{comment.user[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-semibold">{comment.user}</p>
          <p className="">{comment.content}</p>
          <Button
            variant="link"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => setIsReplying(!isReplying)}
          >
            <ReplyIcon className="mr-1 h-3 w-3" />
            Reply
          </Button>
        </div>
      </div>
      {isReplying && (
        <div className="relative ml-10 mt-2">
          <Textarea
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="mb-2 resize-none"
            required
          />
          <Button
            size="sm"
            variant="ghost"
            className="absolute bottom-2 right-2 p-2 hover:bg-primary/10 hover:text-blue-300"
            onClick={handleReply}
            disabled={!replyContent.trim()}
          >
            <SendHorizontal width="20" height="20" />
          </Button>
        </div>
      )}
      {comment.replies.map((reply, index) => (
        <div key={index} className="ml-10 mt-2">
          <div className="flex items-start gap-3 text-sm">
            <Avatar>
              <AvatarFallback>{reply.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{reply.user}</p>
              <p className="">{reply.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
