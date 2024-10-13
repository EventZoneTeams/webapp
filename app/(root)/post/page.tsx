"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  MapPinIcon,
  ClockIcon,
  ChevronDownIcon,
  Heart,
  MessageCircle,
  UserIcon,
  ReplyIcon,
  SendHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Simulated user data (in a real app, this would come from authentication)
const currentUser = {
  id: "user1",
  name: "Current User",
  avatar: "/placeholder.svg?height=32&width=32",
};

// This would typically come from an API
const eventData = {
  id: "1",
  title: "TechConf 2024",
  date: "September 15-17, 2024",
  location: "San Francisco Convention Center",
  time: "9:00 AM - 6:00 PM (PST)",
  description:
    "Join us for the premier tech event of the year, featuring industry leaders and innovative workshops.",
  imageUrl: "/placeholder.svg?height=400&width=800",
  followers: 1500,
  host: {
    name: "TechCorp Inc.",
    avatar: "/placeholder.svg?height=64&width=64",
  },
};

// This would also typically come from an API
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

function EventHeader({ event, isFollowing, onToggleFollow }) {
  return (
    <div className="mb-8">
      <Image
        src={event.imageUrl}
        alt={event.title}
        width={800}
        height={400}
        className="h-64 w-full rounded-lg object-cover shadow-md"
      />
      <div className="mt-4 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {event.date}
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              {event.location}
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-4 w-4" />
              {event.time}
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <Avatar className="mr-2 h-6 w-6">
              <AvatarImage src={event.host.avatar} alt={event.host.name} />
              <AvatarFallback>{event.host.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">
              Hosted by {event.host.name}
            </span>
          </div>
        </div>
        <Button
          variant={isFollowing ? "outline" : "default"}
          onClick={onToggleFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"} ({event.followers})
        </Button>
      </div>
      <p className="mt-4">{event.description}</p>
    </div>
  );
}

function Comment({ comment, onReply }) {
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

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");
  const [mentionedUsers, setMentionedUsers] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const isLiked = likes.includes(currentUser.id);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes.filter((id) => id !== currentUser.id));
    } else {
      setLikes([...likes, currentUser.id]);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentObj = {
        id: String(comments.length + 1),
        user: currentUser.name,
        content: newComment.trim(),
        replies: [],
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
      setMentionedUsers([]);
    }
  };

  const handleReply = (commentId, replyContent) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [
            ...comment.replies,
            { user: currentUser.name, content: replyContent },
          ],
        };
      }
      return comment;
    });
    setComments(updatedComments);
  };

  const handleMention = (user) => {
    setNewComment(newComment + `@${user} `);
    setMentionedUsers([]);
  };

  return (
    <Card className="mb-8 bg-primary/5">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <p className="text-sm">{new Date(post.date).toLocaleDateString()}</p>
      </CardHeader>
      <CardContent>
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={300}
          className="mb-4 h-48 w-full rounded-md object-cover"
        />
        <p className="mb-4">{post.content}</p>
        <div className="mb-4 flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className={`h-8 p-0 ${isLiked && "text-red-500 hover:text-red-600"} px-2 hover:bg-primary/10`}
          >
            <Heart
              className={`mr-1 h-5 w-5 ${isLiked ? "fill-current" : "stroke-current"}`}
            />
            <span className="">{likes.length}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 bg-transparent p-0 px-2 hover:bg-primary/10"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="mr-1 h-5 w-5" />
            <span className="">{comments.length}</span>
          </Button>
        </div>
        {showComments && (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="">
        <form onSubmit={handleAddComment} className="relative w-full">
          <div className="flex gap-2">
            <Popover open={mentionedUsers.length > 0}>
              <PopoverTrigger asChild>
                <Textarea
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                    // const lastWord = e.target.value.split(" ").pop();
                    // if (lastWord.startsWith("@")) {
                    //   setMentionedUsers(
                    //     ["Alice", "Bob", "Charlie", "Diana"].filter((user) =>
                    //       user
                    //         .toLowerCase()
                    //         .startsWith(lastWord.slice(1).toLowerCase()),
                    //     ),
                    //   );
                    // } else {
                    //   setMentionedUsers([]);
                    // }
                  }}
                  className="flex-grow resize-none"
                  required
                />
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0">
                {mentionedUsers.map((user) => (
                  <Button
                    key={user}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleMention(user)}
                  >
                    <UserIcon className="mr-2 h-4 w-4" />
                    {user}
                  </Button>
                ))}
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              className="absolute bottom-2 right-2 p-2 hover:bg-primary/10 hover:text-blue-300"
              type="submit"
              disabled={!newComment.trim()}
            >
              <SendHorizontal width="20" height="20" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

export default function EventPosts() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(eventData.followers);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) =>
      Math.min(prevVisible + 3, postsData.length),
    );
  };

  const handleToggleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowers((prevFollowers) =>
      isFollowing ? prevFollowers - 1 : prevFollowers + 1,
    );
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <EventHeader
        event={{ ...eventData, followers }}
        isFollowing={isFollowing}
        onToggleFollow={handleToggleFollow}
      />

      <h2 className="mb-4 text-2xl font-bold">Event Updates</h2>

      {postsData.slice(0, visiblePosts).map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {visiblePosts < postsData.length && (
        <div className="mt-6 text-center">
          <Button onClick={loadMorePosts} variant="outline">
            Load More <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
