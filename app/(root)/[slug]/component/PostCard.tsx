import Comment from "./Comment";

export default function PostCard({ eventId }: { eventId: string }) {
const postsData = [
  {
    id: "1",
    title: "Keynote Speaker Announcement",
    content:
      "We're excited to announce our keynote speaker for TechConf 2024...",
    date: "2024-05-01",
    imageUrl: "/placeholder.svg?height=300&width=400",
    likes: ["user2", "user3"],
    comments: [
      {
        id: "1",
        user: "Alice",
        content: "Can't wait to hear the keynote!",
        replies: [],
      },
      {
        id: "2",
        user: "Bob",
        content: "This is going to be amazing!",
        replies: [],
      },
    ],
  },
  {
    id: "2",
    title: "Early Bird Tickets Now Available",
    content: "Get your early bird tickets for TechConf 2024 now and save...",
    date: "2024-05-15",
    imageUrl: "/placeholder.svg?height=300&width=400",
    likes: ["user1", "user3"],
    comments: [
      { id: "1", user: "Charlie", content: "Just got my ticket!", replies: [] },
      {
        id: "2",
        user: "Diana",
        content: "Are group discounts available?",
        replies: [],
      },
    ],
  },
  {
    id: "3",
    title: "Call for Speakers Open",
    content:
      "Are you an industry expert? Submit your speaker proposal for TechConf 2024...",
    date: "2024-06-01",
    imageUrl: "/placeholder.svg?height=300&width=400",
    likes: ["user2"],
    comments: [
      {
        id: "1",
        user: "Eve",
        content: "Just submitted my proposal!",
        replies: [],
      },
      {
        id: "2",
        user: "Frank",
        content: "What topics are you looking for?",
        replies: [],
      },
    ],
  },
];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="rounded-lg bg-background/50 p-4">
          <p>{post.content}</p>
          <p className="text-sm text-gray-400">
            Posted by {post.author} on {post.createdAt.toLocaleString()}
          </p>
          <Comment postId={post.id} />
        </div>
      ))}
    </div>
  );
}
